import React from "react";
import ReactDOM from "react-dom";
import Root from "./Root";
import "Config/axiosGlobalConfig";
import "Styles/styles.scss";

async function main() {
  if (process.env.NODE_ENV === "development") {
    if (window.location.pathname === "/BMRG_APP_ROOT_CONTEXT") {
      window.location.pathname = "/BMRG_APP_ROOT_CONTEXT/";
      return;
    }
    const { worker } = require("./mocks/browser");
    await worker.start({
      onUnhandledRequest: "bypass",
      serviceWorker: {
        url: "/BMRG_APP_ROOT_CONTEXT/mockServiceWorker.js",
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
