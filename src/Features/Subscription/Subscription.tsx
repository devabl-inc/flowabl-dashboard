import React from 'react'
import { Button, RadioTile, TileGroup, UnorderedList, ListItem, FeatureHeader, FeatureHeaderTitle, FeatureHeaderSubtitle } from "@boomerang-io/carbon-addons-boomerang-react";
import { Delete16 } from "@carbon/icons-react";
import styles from "./Subscription.module.scss";

export default function Subscription() {

    const [selected, setSelected] = React.useState("free");

    const handleOnClick = (tier: string) => () => {
        setSelected(tier);
    }

    return (
        <article className={styles.container}>
                            <FeatureHeader >
                    <FeatureHeaderTitle>Subscription</FeatureHeaderTitle>
                    <FeatureHeaderSubtitle>Some nice words about your sub!</FeatureHeaderSubtitle>
                </FeatureHeader>
                <dl className={styles.contentContainer}>
                    <div>
                    <dt className={styles.contentLabel}>Current Subscription</dt>
                    <dd className={styles.contentText}>You are on the <strong>free</strong> tier</dd>
                    </div>
                    <div>
                    <dt className={styles.contentLabel}>What you get</dt>
                    <dd className={styles.contentText}> <UnorderedList>
                                <ListItem>Visual Workflow Editor</ListItem>
                                <ListItem>Single User</ListItem>
                                <ListItem>2 Workflows</ListItem>
                            </UnorderedList></dd>
                    </div>
                </dl>
            <div className={styles.tilesContainer} >
                        <RadioTile checked={selected === "free"} value="free" className={styles.tile} onClick={handleOnClick("free")}><h2 className={styles.tileTitle}>Free</h2>
                            <UnorderedList>
                                <ListItem>Visual Workflow Editor</ListItem>
                                <ListItem>Single User</ListItem>
                                <ListItem>2 Workflows</ListItem>
                            </UnorderedList>
                        </RadioTile>
                        <RadioTile checked={selected === "1"} value="1" className={styles.tile} onClick={handleOnClick("1")}><h2 className={styles.tileTitle}>Tier 1</h2>
                        <UnorderedList>
                                <ListItem>Visual Workflow Editor</ListItem>
                                <ListItem>Single User</ListItem>
                                <ListItem>10 Workflows</ListItem>
                            </UnorderedList>
                        </RadioTile>
                        <RadioTile checked={selected === "2"} value="2" className={styles.tile} onClick={handleOnClick("2")}><h2 className={styles.tileTitle}>Tier 2</h2>
                        <UnorderedList>
                                <ListItem>Visual Workflow Editor</ListItem>
                                <ListItem>Unlimited Users</ListItem>
                                <ListItem>50 Workflows</ListItem>
                                <ListItem>Unlimited Tasks</ListItem>
                                <ListItem>Premium Support</ListItem>
                            </UnorderedList>
                        </RadioTile>
                        <RadioTile checked={selected === "3"} className={styles.tile} value="3" onClick={handleOnClick("3")}><h2 className={styles.tileTitle}>Tier 3</h2>
                        <UnorderedList>
                                <ListItem>Visual Workflow Editor</ListItem>
                                <ListItem>Unlimited Users</ListItem>
                                <ListItem>250 Workflows</ListItem>
                                <ListItem>Unlimited Tasks</ListItem>
                                <ListItem>Premium Support</ListItem>
                            </UnorderedList>
                        </RadioTile>
                </div>
                <section className={styles.buttonsContainer}>               
            <Button kind="danger" renderIcon={Delete16}>Cancel Subscription</Button></section>

        </article>
    )
}
