import React from 'react'
import { ClickableTile, FeatureHeader, FeatureHeaderTitle, FeatureHeaderSubtitle } from "@boomerang-io/carbon-addons-boomerang-react";
import { Launch16 } from '@carbon/icons-react';
import { Advocate, BugVirusMalware, Envelope, QuestionAndAnswer, TextLayout, Tools } from '@carbon/pictograms-react'; 
import styles from "./Support.module.scss";

export default function Support() {
    const handleOnClick = (tier: string) => () => {
        alert(`selected tier ${tier}!`);
    }
    return (
          <article className={styles.container}>
                <FeatureHeader>
                    <FeatureHeaderTitle>Support</FeatureHeaderTitle>
                    <FeatureHeaderSubtitle>Anything and everything you need</FeatureHeaderSubtitle>
                </FeatureHeader>
                <div className={styles.contentContainer}>
                <section className={styles.tilesContainer}>
                        <ClickableTile light onClick={handleOnClick("chat")} className={styles.tile} role="button" tabIndex="0"><QuestionAndAnswer/><h2 className={styles.tileTitle}>Chat</h2></ClickableTile>
                        <ClickableTile light className={styles.tile} href="mailto:admin@flowabl.io?subject=Hi!"><Envelope /><h2 className={styles.tileTitle}>Email</h2></ClickableTile>
                        <ClickableTile light className={styles.tile} href="https://www.useboomerang.io/docs" target="_blank" rel="noopen nofollow" aria-describedby="#new-window-aria-desc-0"><TextLayout /><div className={styles.tileTitle}><h2>Documentation </h2><Launch16 aria-label="Documentation opens in new tab"/></div></ClickableTile>
                        <ClickableTile light className={styles.tile} href="https://github.com/flowabl" target="_blank" rel="noopen nofollow" aria-describedby="#new-window-aria-desc-0"><BugVirusMalware /><div className={styles.tileTitle}><h2>Report a bug</h2><Launch16 aria-label="Report a bug opens in a new tab"/></div></ClickableTile>
                        <ClickableTile light className={styles.tile} href="https://github.com/flowabl" target="_blank" rel="noopen nofollow" aria-describedby="#new-window-aria-desc-0"><Tools /><div className={styles.tileTitle}><h2>Request a feature</h2><Launch16 aria-label="Request a feature opens in new tab"/></div></ClickableTile>
                        <ClickableTile light onClick={handleOnClick("help")} className={styles.tile} role="button" tabIndex="0"><Advocate /><h2 className={styles.tileTitle}>Request workflow help (premium only)</h2></ClickableTile>
                </section>
                </div>
              </article>
    )
}
