import React from 'react'
import { Tile, FeatureHeader, FeatureHeaderTitle, FeatureHeaderSubtitle } from "@boomerang-io/carbon-addons-boomerang-react";
import { Email32, Keyboard32, Book32, BeeBat32, ToolBox32, Help32 } from '@carbon/icons-react';
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
                        <Tile onClick={handleOnClick("chat")} className={styles.tile}><h2 className={styles.tileTitle}>Chat</h2><Keyboard32/></Tile>
                        <Tile onClick={handleOnClick("support")} className={styles.tile}><h2 className={styles.tileTitle}>Email</h2><Email32/></Tile>
                        <Tile onClick={handleOnClick("docs")} className={styles.tile}><h2 className={styles.tileTitle}>Documentation</h2><Book32/></Tile>
                        <Tile onClick={handleOnClick("bug")} className={styles.tile}><h2 className={styles.tileTitle}>Report a bug</h2><BeeBat32/></Tile>
                        <Tile onClick={handleOnClick("feature")} className={styles.tile}><h2 className={styles.tileTitle}>Request a feature</h2><ToolBox32/></Tile>
                        <Tile onClick={handleOnClick("help")} className={styles.tile}><h2 className={styles.tileTitle}>Request workflow help</h2><Help32/></Tile>
                </section>
                </div>
              </article>
    )
}
