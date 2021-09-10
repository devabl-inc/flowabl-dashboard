import React from "react";
import {
  ClickableTile,
  FeatureHeader,
  FeatureHeaderTitle,
  FeatureHeaderSubtitle,
} from "@boomerang-io/carbon-addons-boomerang-react";
import { DOCS_URL, SUPPORT_EMAIL } from "Config/appConfig";
import { Launch16, Chat16, App16 } from "@carbon/icons-react";
import { Advocate, BugVirusMalware, Envelope, QuestionAndAnswer, TextLayout, Tools } from "@carbon/pictograms-react";
import styles from "./Support.module.scss";

export default function Support() {
  const handleOnClick = () => {
    //@ts-ignore
    window.$chatwoot.toggle();
  };

  return (
    <article className={styles.container}>
      <FeatureHeader>
        <FeatureHeaderTitle>Support</FeatureHeaderTitle>
        <FeatureHeaderSubtitle>Anything and everything you need</FeatureHeaderSubtitle>
      </FeatureHeader>
      <div className={styles.contentContainer}>
        <section className={styles.tilesContainer}>
          <ClickableTile light className={styles.tile} handleClick={handleOnClick} role="button" tabIndex="0">
            <QuestionAndAnswer />
            <div className={styles.tileTitle}>
              <h2>Chat</h2>
              <Chat16 />
            </div>
          </ClickableTile>
          <ClickableTile light className={styles.tile} href={`mailto:${SUPPORT_EMAIL}?subject=Hi!`}>
            <Envelope />
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
            <TextLayout />
            <div className={styles.tileTitle}>
              <h2>Documentation </h2>
              <Launch16 aria-label="Documentation opens in new tab" />
            </div>
          </ClickableTile>
          <ClickableTile light className={styles.tile} handleClick={handleOnClick} role="button" tabIndex="0">
            <BugVirusMalware />
            <div className={styles.tileTitle}>
              <h2>Report a bug</h2>
              <Chat16 />
            </div>
          </ClickableTile>
          <ClickableTile light className={styles.tile} handleClick={handleOnClick} role="button" tabIndex="0">
            <Tools />
            <div className={styles.tileTitle}>
              <h2>Request a feature</h2>
              <Chat16 />
            </div>
          </ClickableTile>
          <ClickableTile light className={styles.tile} handleClick={handleOnClick} role="button" tabIndex="0">
            <Advocate />
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
