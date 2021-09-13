import React from "react";
import { ErrorDragon } from "@boomerang-io/carbon-addons-boomerang-react";
import { PRODUCT_ENV_URL } from "Config/platformUrlConfig";
import styles from "./errorDragon.module.scss";

function ErrorDragonComponent() {
  return (
    <div className={styles.container}>
      <ErrorDragon statusUrl={`${PRODUCT_ENV_URL}/status`} />
    </div>
  );
}

export default ErrorDragonComponent;
