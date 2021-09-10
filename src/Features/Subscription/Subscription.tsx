import React from "react";
import {
  Button,
  RadioTile,
  UnorderedList,
  ListItem,
  FeatureHeader,
  FeatureHeaderTitle,
  FeatureHeaderSubtitle,
} from "@boomerang-io/carbon-addons-boomerang-react";
import { Delete16 } from "@carbon/icons-react";
import styles from "./Subscription.module.scss";

export default function Subscription() {
  const [selected, setSelected] = React.useState("free");

  const handleOnClick = (tier: string) => () => {
    setSelected(tier);
  };

  return (
    <>
      <FeatureHeader includeBorder={false}>
        <FeatureHeaderTitle>Subscription</FeatureHeaderTitle>
        <FeatureHeaderSubtitle>What you are getting for your money</FeatureHeaderSubtitle>
      </FeatureHeader>
      <article className={styles.container}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Your subscription</h2>
          <dl className={styles.contentContainer}>
            <div>
              <dt className={styles.contentLabel}>Tier</dt>
              <dd className={styles.contentText}>
                You are on the <strong>free</strong> tier
              </dd>
            </div>
            <div>
              <dt className={styles.contentLabel}>What you get</dt>
              <dd className={styles.contentText}>
                {" "}
                <UnorderedList>
                  <ListItem>Visual Workflow Editor</ListItem>
                  <ListItem>Single User</ListItem>
                  <ListItem>2 Workflows</ListItem>
                </UnorderedList>
              </dd>
            </div>
          </dl>
        </section>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Manage Subscription (coming soon!)</h2>
          <div className={styles.tilesContainer}>
            <RadioTile
              disabled
              checked={selected === "free"}
              value="free"
              className={styles.tile}
              onClick={handleOnClick("free")}
            >
              <h2 className={styles.tileTitle}>Free</h2>
              <UnorderedList>
                <ListItem>Visual Workflow Editor</ListItem>
                <ListItem>Single User</ListItem>
                <ListItem>2 Workflows</ListItem>
              </UnorderedList>
            </RadioTile>
            <RadioTile
              disabled
              checked={selected === "1"}
              value="1"
              className={styles.tile}
              onClick={handleOnClick("1")}
            >
              <h2 className={styles.tileTitle}>Tier 1</h2>
              <UnorderedList>
                <ListItem>Visual Workflow Editor</ListItem>
                <ListItem>Single User</ListItem>
                <ListItem>10 Workflows</ListItem>
              </UnorderedList>
            </RadioTile>
            <RadioTile
              disabled
              checked={selected === "2"}
              value="2"
              className={styles.tile}
              onClick={handleOnClick("2")}
            >
              <h2 className={styles.tileTitle}>Tier 2</h2>
              <UnorderedList>
                <ListItem>Visual Workflow Editor</ListItem>
                <ListItem>Unlimited Users</ListItem>
                <ListItem>50 Workflows</ListItem>
                <ListItem>Unlimited Tasks</ListItem>
                <ListItem>Premium Support</ListItem>
              </UnorderedList>
            </RadioTile>
            <RadioTile
              disabled
              checked={selected === "3"}
              className={styles.tile}
              value="3"
              onClick={handleOnClick("3")}
            >
              <h2 className={styles.tileTitle}>Tier 3</h2>
              <UnorderedList>
                <ListItem>Visual Workflow Editor</ListItem>
                <ListItem>Unlimited Users</ListItem>
                <ListItem>250 Workflows</ListItem>
                <ListItem>Unlimited Tasks</ListItem>
                <ListItem>Premium Support</ListItem>
              </UnorderedList>
            </RadioTile>
          </div>
        </section>
        <section className={styles.buttonsContainer}>
          <Button kind="danger" renderIcon={Delete16}>
            Cancel Subscription
          </Button>
        </section>
      </article>
    </>
  );
}
