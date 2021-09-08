import React from 'react'
import { Button, Tile, UnorderedList, ListItem, FeatureHeader, FeatureHeaderTitle, FeatureHeaderSubtitle } from "@boomerang-io/carbon-addons-boomerang-react";
import { Delete16 } from "@carbon/icons-react";
import styles from "./Subscription.module.scss";

export default function Subscription() {

    const handleOnClick = (tier: string) => () => {
        alert(`selected tier ${tier}!`);
    }

    return (
        <article className={styles.container}>
                            <FeatureHeader >
                    <FeatureHeaderTitle>Subscription</FeatureHeaderTitle>
                    <FeatureHeaderSubtitle>Some nice words about your sub!</FeatureHeaderSubtitle>
                </FeatureHeader>
                <div className={styles.contentContainer}>
                    <h2>Current Subscription</h2>
                    <p>You are currently on the free tier</p>
                </div>
            <section className={styles.tilesContainer}>
                        <Tile data-status='active' onClick={handleOnClick("free")} className={styles.tile}><h2 className={styles.tileTitle}>Free</h2>
                            <UnorderedList>
                                <ListItem>Visual Workflow Editor</ListItem>
                                <ListItem>Single User</ListItem>
                                <ListItem>2 Workflows</ListItem>
                            </UnorderedList>
                        </Tile>
                        <Tile onClick={handleOnClick("1")} className={styles.tile}><h2 className={styles.tileTitle}>Tier 1</h2>
                        <UnorderedList>
                                <ListItem>Visual Workflow Editor</ListItem>
                                <ListItem>Single User</ListItem>
                                <ListItem>10 Workflows</ListItem>
                            </UnorderedList>
                        </Tile>
                        <Tile onClick={handleOnClick("2")} className={styles.tile}><h2 className={styles.tileTitle}>Tier 2</h2>
                        <UnorderedList>
                                <ListItem>Visual Workflow Editor</ListItem>
                                <ListItem>Unlimited Users</ListItem>
                                <ListItem>50 Workflows</ListItem>
                                <ListItem>Unlimited Tasks</ListItem>
                                <ListItem>Premium Support</ListItem>
                            </UnorderedList>
                        </Tile>
                        <Tile onClick={handleOnClick("3")} className={styles.tile}><h2 className={styles.tileTitle}>Tier 3</h2>
                        <UnorderedList>
                                <ListItem>Visual Workflow Editor</ListItem>
                                <ListItem>Unlimited Users</ListItem>
                                <ListItem>250 Workflows</ListItem>
                                <ListItem>Unlimited Tasks</ListItem>
                                <ListItem>Premium Support</ListItem>
                            </UnorderedList>
                        </Tile>
                </section>
                <section className={styles.buttonsContainer}>               
            <Button kind="danger" renderIcon={Delete16}>Cancel Subscription</Button></section>

        </article>
    )
}
