import React from "react";
import {
  Tile,
  ClickableTile,
  FeatureHeader,
  FeatureHeaderTitle,
  FeatureHeaderSubtitle,
} from "@boomerang-io/carbon-addons-boomerang-react";
import { Launch16, Chat16 } from "@carbon/icons-react";
import { Advocate, BugVirusMalware, Envelope, QuestionAndAnswer, TextLayout, Tools } from "@carbon/pictograms-react";
import styles from "./Support.module.scss";

export default function Support() {
  const handleOnClick = () => {
    //@ts-ignore
    console.log(window.$chatwoot);
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
          <Tile light onClick={handleOnClick} className={styles.tile} role="button" tabIndex="0">
            <QuestionAndAnswer />
            <div className={styles.tileTitle}>
              <h2>Chat</h2>
              <Chat16 />
            </div>
          </Tile>
          <ClickableTile light className={styles.tile} href="mailto:admin@flowabl.io?subject=Hi!">
            <Envelope />
            <h2 className={styles.tileTitle}>Email</h2>
          </ClickableTile>
          <ClickableTile
            light
            className={styles.tile}
            href="https://www.useboomerang.io/docs"
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
          <Tile light className={styles.tile} role="button" tabIndex="0">
            <BugVirusMalware />
            <div className={styles.tileTitle}>
              <h2>Report a bug</h2>
              <Chat16 />
            </div>
          </Tile>
          <Tile light className={styles.tile} role="button" tabIndex="0">
            <Tools />
            <div className={styles.tileTitle}>
              <h2>Request a feature</h2>
              <Chat16 />
            </div>
          </Tile>
          <Tile light onClick={handleOnClick} className={styles.tile} role="button" tabIndex="0">
            <Advocate />
            <div className={styles.tileTitle}>
              <h2>Request workflow help (premium only)</h2>
              <Chat16 />
            </div>
          </Tile>
        </section>
      </div>
    </article>
  );
}
