import * as React from "react";
import { useAuth } from "Hooks";
import {
  Button,
  RadioTile,
  UnorderedList,
  ListItem,
  FeatureHeader,
  FeatureHeaderTitle,
  FeatureHeaderSubtitle,
  Loading,
} from "@boomerang-io/carbon-addons-boomerang-react";
import { Delete16 } from "@carbon/icons-react";
import { SubscriptionConfigs, Tiers } from "Config/appConfig";
import { FlowablSubscription } from "Utils/types";
import styles from "./Subscription.module.scss";

export default function Subscription() {
  const { subscription } = useAuth();
  const [selectedTier, setSelectedTier] = React.useState<FlowablSubscription | undefined>(subscription);

  React.useEffect(() => {
    setSelectedTier(subscription);
  }, [subscription]);

  const handleOnClick = (subscription: FlowablSubscription) => () => {
    setSelectedTier(subscription);
  };

  const handleCancel = () => {
    alert(`Are you sure? You will be dropped down to the 'free' tier.`);
  };

  if (!selectedTier) {
    return <Loading />;
  }

  return (
    <article>
      <FeatureHeader includeBorder={false}>
        <FeatureHeaderTitle>Subscription</FeatureHeaderTitle>
        <FeatureHeaderSubtitle>What you are getting for your money</FeatureHeaderSubtitle>
      </FeatureHeader>
      <div className={styles.container}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Your subscription</h2>
          <dl className={styles.contentContainer}>
            <div>
              <dt className={styles.contentLabel}>Tier</dt>
              <dd className={styles.contentText}>
                You are on the <strong>{selectedTier.name}</strong> tier.
              </dd>
            </div>
            <div>
              <dt className={styles.contentLabel}>What you get</dt>
              <dd className={styles.contentText}>
                {" "}
                <UnorderedList>
                  <ListItem>Visual Workflow Editor</ListItem>
                  <ListItem>Teams</ListItem>
                  <ListItem>Custom Tasks</ListItem>
                  <ListItem>50 workflows</ListItem>
                  <ListItem>200 executions per month</ListItem>
                  <ListItem>5 concurrent executions</ListItem>
                  <ListItem>2 hr execution duration</ListItem>
                  <ListItem>Persistent Storage</ListItem>
                  <ListItem>Insights for 1 year</ListItem>
                  <ListItem>Premium support (addon)</ListItem>
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
              checked={selectedTier.product === Tiers.Free}
              value={Tiers.Free}
              className={styles.tile}
              onClick={handleOnClick(SubscriptionConfigs[Tiers.Free])}
            >
              <h2 className={styles.tileTitle}>Explorer</h2>
              <UnorderedList>
                <ListItem>Visual Workflow Editor</ListItem>
                <ListItem>Single User</ListItem>
                <ListItem>2 workflows</ListItem>
                <ListItem>10 executions per month</ListItem>
                <ListItem>30 min execution duration</ListItem>
                <ListItem>Insights for 30 days</ListItem>
              </UnorderedList>
            </RadioTile>
            <RadioTile
              disabled
              checked={selectedTier.product === Tiers.Starter}
              value={Tiers.Starter}
              className={styles.tile}
              onClick={handleOnClick(SubscriptionConfigs[Tiers.Starter])}
            >
              <h2 className={styles.tileTitle}>Starter</h2>
              <UnorderedList>
                <ListItem>Visual Workflow Editor</ListItem>
                <ListItem>Single User</ListItem>
                <ListItem>10 workflows</ListItem>
                <ListItem>40 executions per month</ListItem>
                <ListItem>2 concurrent executions</ListItem>
                <ListItem>2 hr execution duration</ListItem>
                <ListItem>Persistent Storage</ListItem>
                <ListItem>Insights for 90 days</ListItem>
              </UnorderedList>
            </RadioTile>
            <RadioTile
              disabled
              checked={selectedTier.product === Tiers.Maker}
              value={Tiers.Maker}
              className={styles.tile}
              onClick={handleOnClick(SubscriptionConfigs[Tiers.Maker])}
            >
              <h2 className={styles.tileTitle}>Maker</h2>
              <UnorderedList>
                <ListItem>Visual Workflow Editor</ListItem>
                <ListItem>Teams</ListItem>
                <ListItem>Custom Tasks</ListItem>
                <ListItem>50 workflows</ListItem>
                <ListItem>200 executions per month</ListItem>
                <ListItem>5 concurrent executions</ListItem>
                <ListItem>2 hr execution duration</ListItem>
                <ListItem>Persistent Storage</ListItem>
                <ListItem>Insights for 1 year</ListItem>
                <ListItem>Premium support (addon)</ListItem>
              </UnorderedList>
            </RadioTile>
            <RadioTile
              disabled
              checked={selectedTier.product === Tiers.Premium}
              className={styles.tile}
              value={Tiers.Premium}
              onClick={handleOnClick(SubscriptionConfigs[Tiers.Premium])}
            >
              <h2 className={styles.tileTitle}>Scaler</h2>
              <UnorderedList>
                <ListItem>Visual Workflow Editor</ListItem>
                <ListItem>Teams</ListItem>
                <ListItem>Custom Tasks</ListItem>
                <ListItem>500 workflows</ListItem>
                <ListItem>2,000 executions per month</ListItem>
                <ListItem>5 concurrent executions</ListItem>
                <ListItem>24 hr execution duration</ListItem>
                <ListItem>Persistent Storage</ListItem>
                <ListItem>Insights for 1 year</ListItem>
                <ListItem>Premium support (addon)</ListItem>
                <ListItem>Custom Workflows (addon)</ListItem>
                <ListItem>Roadmap Partnership (addon)</ListItem>
                <ListItem>Dedicated Instance (addon)</ListItem>
              </UnorderedList>
            </RadioTile>
          </div>
        </section>
        <section className={styles.buttonsContainer}>
          <Button disabled kind="danger" renderIcon={Delete16} onClick={handleCancel}>
            Cancel Subscription
          </Button>
        </section>
      </div>
    </article>
  );
}
