/*eslint-env node*/

const path = require("path");
const fs = require("fs");
const cors = require("cors");
const axios = require("axios");
const serialize = require("serialize-javascript");
const boomerangLogger = require("@boomerang-io/logger-middleware")("webapp-spa-server/index.js");
const health = require("@cloudnative/health-connect");
const defaultHtmlHeadInjectDataKeys = require("./config").defaultHtmlHeadInjectDataKeys;
const { Client } = require("@notionhq/client");

// Get logger function
const logger = boomerangLogger.logger;

/**
 * Begin exported module
 */

function createBoomerangServer({
  corsConfig = {
    origin: /.*/g,
    allowedHeaders: "Content-Type, Authorization, Content-Length, X-Requested-With",
    methods: "DELETE,GET,OPTIONS,PATCH,POST,PUT",
  },
  disableInjectHTMLHeadData,
}) {
  /**
   * Read in values from process.env object
   * Set defaults for the platform for unprovided values
   */
  const {
    APP_ROOT = "/",
    PORT = 3000,
    HTML_HEAD_INJECTED_DATA_KEYS = defaultHtmlHeadInjectDataKeys.join(),
    NEW_RELIC_APP_NAME,
    NEW_RELIC_LICENSE_KEY,
    HTML_HEAD_INJECTED_SCRIPTS,
    BUILD_DIR = "build",
    FLOW_WEBOOK_URL = "https://app.flowabl.io/services/listener/webhook",
    JOIN_EMAIL_WORKFLOW_ID = "61454e2d1000b141daa8f85f",
    FLOW_ACCESS_TOKEN,
  } = process.env;

  // Monitoring
  if (NEW_RELIC_APP_NAME && NEW_RELIC_LICENSE_KEY) {
    require("newrelic");
  }

  /**
   * Start Express app
   */
  const express = require("express");
  const app = express();

  // Compression
  const compression = require("compression");
  app.use(compression());

  // Logging
  app.use(boomerangLogger.middleware);

  // Security
  const helmet = require("helmet");
  app.use(helmet());
  app.disable("x-powered-by");
  app.use(cors(corsConfig));

  // Parsing
  const bodyParser = require("body-parser");
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  // Initialize healthchecker and add routes
  const healthchecker = new health.HealthChecker();
  app.use("/health", health.LivenessEndpoint(healthchecker));
  app.use("/ready", health.ReadinessEndpoint(healthchecker));

  /**
   * Add endpoint for posting to notion
   */
  const notion = new Client({
    auth: process.env.NOTION_API_KEY,
  });

  // Create subscription for user
  app.post("/api/subscription", async (req, res) => {
    console.log({ body: req.body });
    const { name, email, tier } = req.body;
    try {
      const url = new URL(FLOW_WEBOOK_URL);
      url.searchParams.append("workflowId", JOIN_EMAIL_WORKFLOW_ID);
      url.searchParams.append("type", "generic");
      url.searchParams.append("access_token", FLOW_ACCESS_TOKEN);
      await axios.post(url.toString(), {
        email,
        name,
        tier,
        type: "create",
      });
      res.send(200);
    } catch (e) {
      console.log(`Something went wrong initializing the subscription for the user`);
      console.log(e);
      res.send(500);
    }
  });

  // // Update subscription for user
  // app.put("/subscription", async (req, res) => {
  //   const { type, name, email, tier } = req.body;
  //   fetch(`${FLOW_WEBOOK_URL}?workflowId=${JOIN_EMAIL_WORKFLOW_ID}&type=generic&access_token=${FLOW_ACCESS_TOKEN}`, {
  //     email,
  //     name,
  //     tier,
  //     type, // upgrade, downgrade, cancel
  //   });
  // });

  app.post("/api/features", async (req, res) => {
    try {
      const response = await notion.request({
        path: "pages",
        method: "POST",
        body: {
          parent: { database_id: process.env.NOTION_DB_ID },
          properties: {
            Feature: {
              title: [
                {
                  text: {
                    content: req.body.feature,
                  },
                },
              ],
            },
            Description: {
              rich_text: [
                {
                  text: {
                    content: req.body.description,
                  },
                },
              ],
            },
            Benefit: {
              rich_text: [
                {
                  text: {
                    content: req.body.benefit,
                  },
                },
              ],
            },
          },
        },
      });
      res.json(response);
    } catch (e) {
      res.json(e);
    }
  });

  // Create endpoint for the app serve static assets
  const appRouter = express.Router();

  /**
   * Next two routes are needed for serving apps with client-side routing
   * Do NOT return index.html file by default if `disableInjectHTMLHeadData = true`. We need append data to it.
   * It will be returned on the second route
   * https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#serving-apps-with-client-side-routing
   */
  if (!disableInjectHTMLHeadData) {
    appRouter.use(
      "/",
      express.static(path.join(process.cwd(), BUILD_DIR), {
        index: false,
      })
    );
    appRouter.get("/*", (req, res) =>
      injectEnvDataAndScriptsIntoHTML(
        res,
        BUILD_DIR,
        HTML_HEAD_INJECTED_DATA_KEYS,
        HTML_HEAD_INJECTED_SCRIPTS,
        APP_ROOT
      )
    );
  } else {
    appRouter.use("/", express.static(path.join(process.cwd(), BUILD_DIR)));
  }

  app.use(APP_ROOT, appRouter);

  // Start server on the specified port and binding host
  app.listen(PORT, "0.0.0.0", function () {
    logger.debug("server starting on", PORT);
    logger.debug(`serving on root context: ${APP_ROOT}`);
    logger.info(`View app: http://localhost:${PORT}${APP_ROOT}`);
  });

  // Return server if needed to be used in an app
  return app;
}

/**
 * Start utility functions
 */

/**
 * Add JSON data and scripts to the html file based on environment. Enables same docker image to be used in any environment
 * https://medium.com/@housecor/12-rules-for-professional-javascript-in-2015-f158e7d3f0fc
 * https://stackoverflow.com/questions/33027089/res-sendfile-in-node-express-with-passing-data-along
 * @param {function} res - Express response function
 * @param {string} buildDir - build directory for building up path to index.html file
 * @param {string} injectedDataKeys - string of comma delimited values
 * @param {string} injectedScripts - string of comma delimited values
 * @param {string} appRoot - root context off app. Used for script injection
 */
function injectEnvDataAndScriptsIntoHTML(res, buildDir, injectedDataKeys, injectedScripts, appRoot) {
  /**
   * Create objects to be injected into application via the HEAD tag
   */
  // Build up object of external data to append
  const headInjectedData = injectedDataKeys.split(",").reduce((acc, key) => {
    acc[key] = process.env[key];
    return acc;
  }, {});

  // Build up string of scripts to append, absolute path
  const headScriptsTags = injectedScripts
    ? injectedScripts
        .split(",")
        .reduce((acc, currentValue) => `${acc}<script src="${appRoot}/${currentValue}"></script>`, "")
    : "";
  // Set the response type so browser interprets it as an html file
  res.type(".html");

  // Read in HTML file and add callback functions for EventEmitter events produced by ReadStream
  fs.createReadStream(path.join(process.cwd(), buildDir, "index.html"))
    .on("end", () => {
      res.end();
    })
    .on("error", (e) => logger.error(e))
    .on("data", (chunk) => res.write(addHeadData(chunk)));

  /**
   * Convert buffer to string and replace closing head tag with env-specific data and additional scripts
   * Serialize data for security
   * https://medium.com/node-security/the-most-common-xss-vulnerability-in-react-js-applications-2bdffbcc1fa0
   * @param {Buffer} chunk
   * @return {string} replaced string with data interopolated
   */
  function addHeadData(chunk) {
    return chunk.toString().replace(
      "</head>",
      `<script>window._SERVER_DATA = ${serialize(headInjectedData, {
        isJSON: true,
      })};</script>${headScriptsTags}</head>`
    );
  }
}

createBoomerangServer({});
