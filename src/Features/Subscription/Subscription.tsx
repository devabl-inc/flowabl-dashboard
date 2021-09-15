import React from "react";
import { useAuth } from "Hooks";
import {
  Button,
  RadioTile,
  UnorderedList,
  ListItem,
  FeatureHeader,
  FeatureHeaderTitle,
  FeatureHeaderSubtitle,
} from "@boomerang-io/carbon-addons-boomerang-react";
import Layout from "Components/Layout";
import { Delete16 } from "@carbon/icons-react";
import { Tiers } from "Config/appConfig";
import { Tier } from "Utils/types";
import styles from "./Subscription.module.scss";

export default function Subscription() {
  const { subscription } = useAuth();
  const [selectedTier, setSelectedTier] = React.useState<Tier>(subscription?.product);

  React.useEffect(() => {
    setSelectedTier(subscription?.product);
  }, [subscription]);

  const handleOnClick = (tier: Tier) => () => {
    setSelectedTier(tier);
  };

  const handleCancel = () => {
    alert(`Are you sure? You will be dropped down to the 'free' tier.`);
  };

  return (
    <Layout>
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
                You are on the <strong>{selectedTier}</strong> tier
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
          <h2 className={styles.sectionTitle}>Manage subscription (coming soon!)</h2>
          <div className={styles.tilesContainer}>
            <RadioTile
              disabled
              checked={selectedTier === Tiers.Free}
              value={Tiers.Free}
              className={styles.tile}
              onClick={handleOnClick(Tiers.Free)}
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
              checked={selectedTier === Tiers.Starter}
              value={Tiers.Starter}
              className={styles.tile}
              onClick={handleOnClick(Tiers.Starter)}
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
              checked={selectedTier === Tiers.Maker}
              value={Tiers.Maker}
              className={styles.tile}
              onClick={handleOnClick(Tiers.Maker)}
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
              checked={selectedTier === Tiers.Premium}
              className={styles.tile}
              value={Tiers.Premium}
              onClick={handleOnClick(Tiers.Premium)}
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
          <Button kind="danger" renderIcon={Delete16} onClick={handleCancel}>
            Cancel Subscription
          </Button>
        </section>
      </article>
    </Layout>
  );
}
