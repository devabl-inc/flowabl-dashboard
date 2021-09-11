import React from "react";
import {
  ClickableTile,
  FeatureHeader,
  FeatureHeaderTitle,
  FeatureHeaderSubtitle,
} from "@boomerang-io/carbon-addons-boomerang-react";
import { DOCS_URL, SUPPORT_EMAIL } from "Config/appConfig";
import { Launch16, Chat16, App16 } from "@carbon/icons-react";
import Advocate from "@carbon/pictograms-react/lib/advocate";
import BugVirusMalware from "@carbon/pictograms-react/lib/bug--virus--malware";
import Envelope from "@carbon/pictograms-react/lib/envelope";
import QuestionAndAnswer from "@carbon/pictograms-react/lib/question--and--answer";
import TextLayout from "@carbon/pictograms-react/lib/text--layout";
import Tools from "@carbon/pictograms-react/lib/tools";
import styles from "./Support.module.scss";

export default function Support() {
  const handleOnClick = () => {
    //@ts-ignore
    window.$chatwoot.toggle();
  };

  return (
    <article className={styles.container}>
      <FeatureHeader includeBorder={false}>
        <FeatureHeaderTitle>Support</FeatureHeaderTitle>
        <FeatureHeaderSubtitle>How can we help?</FeatureHeaderSubtitle>
      </FeatureHeader>
      <div className={styles.contentContainer}>
        <section className={styles.tilesContainer}>
          <ClickableTile light className={styles.tile} handleClick={handleOnClick} role="button" tabIndex="0">
            <QuestionAndAnswer fill="#009d9a" />
            <div className={styles.tileTitle}>
              <h2>Chat</h2>
              <Chat16 />
            </div>
          </ClickableTile>
          <ClickableTile light className={styles.tile} href={`mailto:${SUPPORT_EMAIL}?subject=Hi!`}>
            <Envelope fill="#009d9a" />
            <div className={styles.tileTitle}>
              <h2>Email</h2>
              <App16 />
            </div>
          </ClickableTile>
          <ClickableTile
            light
            className={styles.tile}
            href={DOCS_URL}
            target="_blank"
            rel="noopen nofollow"
            aria-describedby="#new-window-aria-desc-0"
          >
            <TextLayout fill="#009d9a" />
            <div className={styles.tileTitle}>
              <h2>Documentation </h2>
              <Launch16 aria-label="Documentation opens in new tab" />
            </div>
          </ClickableTile>
          <ClickableTile light className={styles.tile} handleClick={handleOnClick} role="button" tabIndex="0">
            <BugVirusMalware fill="#009d9a" />
            <div className={styles.tileTitle}>
              <h2>Report a bug</h2>
              <Chat16 />
            </div>
          </ClickableTile>
          <ClickableTile light className={styles.tile} handleClick={handleOnClick} role="button" tabIndex="0">
            <Tools color="#009d9a" />
            <div className={styles.tileTitle}>
              <h2>Request a feature</h2>
              <Chat16 />
            </div>
          </ClickableTile>
          <ClickableTile light className={styles.tile} handleClick={handleOnClick} role="button" tabIndex="0">
            <Advocate fill="#009d9a" />
            <div className={styles.tileTitle}>
              <h2>Request workflow help (premium only)</h2>
              <Chat16 />
            </div>
          </ClickableTile>
        </section>
      </div>
    </article>
  );
}
