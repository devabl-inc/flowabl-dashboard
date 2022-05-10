import * as React from "react";
import ReactDOM from "react-dom";
import Root from "./Root";
import "Config/axiosGlobalConfig";
import "Styles/styles.scss";

async function main() {
  if (process.env.NODE_ENV === "development") {
    if (window.location.pathname === "") {
      window.location.pathname = "/";
      return;
    }
    const { worker } = require("./mocks/browser");
    await worker.start({
      onUnhandledRequest: "bypass",
      serviceWorker: {
        url: "/mockServiceWorker.js",
      },
    });
  }
  ReactDOM.render(
    <React.StrictMode>
      <Root />
    </React.StrictMode>,
    document.getElementById("app")
  );
}
main();
