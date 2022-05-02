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
              <dd className={styles.contentText}>
                You are on the <strong>{selectedTier.name}</strong> tier.
              </dd>
              <dd className={styles.contentText}>
                Learn more about what you get.
              </dd>
            </div>
          </dl>
        </section>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Manage subscription</h2>
          <div className={styles.tilesContainer}>
            <RadioTile
              enabled
              checked={selectedTier.product === Tiers.Explorer}
              value={Tiers.Explorer}
              className={styles.tile}
              onClick={handleOnClick(SubscriptionConfigs[Tiers.Explorer])}
            >
              <h2 className={styles.tileTitle}>Explorer</h2>
              <UnorderedList>
                <ListItem>Visual Drag-and-Drop Workflow Editor</ListItem>
                <ListItem>Single User</ListItem>
                <ListItem>2 workflows</ListItem>
                <ListItem>10 executions per month</ListItem>
                <ListItem>10 min execution duration</ListItem>
              </UnorderedList>
            </RadioTile>
            <RadioTile
              enabled
              checked={selectedTier.product === Tiers.Starter}
              value={Tiers.Starter}
              className={styles.tile}
              onClick={handleOnClick(SubscriptionConfigs[Tiers.Starter])}
            >
              <h2 className={`${styles.tileTitle} ${styles.tileTitleSelected}`}>Starter</h2>
              <UnorderedList>
                <ListItem>Visual Drag-and-Drop Workflow Editor</ListItem>
                <ListItem>Single User</ListItem>
                <ListItem>20 workflows</ListItem>
                <ListItem>100 executions per month</ListItem>
                <ListItem>2 concurrent executions</ListItem>
                <ListItem>1 hr execution duration</ListItem>
              </UnorderedList>
            </RadioTile>
            <RadioTile
              enabled
              checked={selectedTier.product === Tiers.Maker}
              value={Tiers.Maker}
              className={styles.tile}
              onClick={handleOnClick(SubscriptionConfigs[Tiers.Maker])}
            >
              <h2 className={styles.tileTitle}>Maker</h2>
              <UnorderedList>
                <ListItem>Visual Drag-and-Drop Workflow Editor</ListItem>
                <ListItem>Unlimited User Teams</ListItem>
                <ListItem>200 workflows</ListItem>
                <ListItem>1,000 executions per month</ListItem>
                <ListItem>10 concurrent executions</ListItem>
                <ListItem>4 hr execution duration</ListItem>
                <ListItem>Custom Tasks</ListItem>
              </UnorderedList>
            </RadioTile>
            <RadioTile
              enabled
              checked={selectedTier.product === Tiers.Scaler}
              className={styles.tile}
              value={Tiers.Scaler}
              onClick={handleOnClick(SubscriptionConfigs[Tiers.Scaler])}
            >
              <h2 className={styles.tileTitle}>Scaler</h2>
              <UnorderedList>
                <ListItem>Visual Drag-and-Drop Workflow Editor</ListItem>
                <ListItem>Unlimited User Teams</ListItem>
                <ListItem>1,000 workflows</ListItem>
                <ListItem>20,000 executions per month</ListItem>
                <ListItem>100 concurrent executions</ListItem>
                <ListItem>24 hr execution duration</ListItem>
                <ListItem>Custom Tasks</ListItem>
              </UnorderedList>
            </RadioTile>
          </div>
        </section>
        <section className={styles.buttonsContainer}>
          <Button disabled kind="danger" renderIcon={Delete16} onClick={handleCancel}>
            Cancel Subscription
          </Button>
        </section>
      </div >
    </article >
  );
}
