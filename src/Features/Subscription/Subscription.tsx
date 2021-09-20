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
  Loading,
} from "@boomerang-io/carbon-addons-boomerang-react";
import { Delete16 } from "@carbon/icons-react";
import { SubscriptionConfigs, Tiers } from "Config/appConfig";
import { FlowablSubscription } from "Utils/types";
import styles from "./Subscription.module.scss";

export default function Subscription() {
  const { subscription } = useAuth();
  const [selectedTier, setSelectedTier] = React.useState<FlowablSubscription>(subscription);

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
                  <ListItem>Visual workflow editor</ListItem>
                  <ListItem>Unlimited users</ListItem>
                  <ListItem>Custom Tasks</ListItem>
                  <ListItem>50 workflows</ListItem>
                  <ListItem>200 executions per month</ListItem>
                  <ListItem>Premium support</ListItem>
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
              <h2 className={styles.tileTitle}>EXPLORER</h2>
              <UnorderedList>
                <ListItem>Visual workflow editor</ListItem>
                <ListItem>Single user</ListItem>
                <ListItem>2 workflows</ListItem>
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
                <ListItem>Visual workflow editor</ListItem>
                <ListItem>Single user</ListItem>
                <ListItem>10 workflows</ListItem>
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
                <ListItem>Visual workflow editor</ListItem>
                <ListItem>Unlimited users</ListItem>
                <ListItem>Custom Tasks</ListItem>
                <ListItem>50 workflows</ListItem>
                <ListItem>200 executions per month</ListItem>
                <ListItem>Premium support</ListItem>
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
                <ListItem>Visual workflow editor</ListItem>
                <ListItem>Unlimited users</ListItem>
                <ListItem>Custom Tasks</ListItem>
                <ListItem>250 workflows</ListItem>
                <ListItem>1000 executions per month</ListItem>
                <ListItem>Unlimited tasks</ListItem>
                <ListItem>Premium support</ListItem>
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
