import * as React from "react";
import { useAuth } from "Hooks";
import {
  Button,
  Tile,
  UnorderedList,
  ListItem,
  FeatureHeader,
  FeatureHeaderTitle,
  FeatureHeaderSubtitle,
  Loading,
  Link,
} from "@boomerang-io/carbon-addons-boomerang-react";
import { Delete16, Launch16 } from "@carbon/icons-react";
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
    //TODO add in CustomerPortal part.
  };

  const handleChange = () => {
    // Do something with selectedTier
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
                <Link
                  visited={false}
                  href="https://flowabl.io/pricing"
                  renderIcon={Launch16}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Learn more about what you get
                </Link>
              </dd>
            </div>
          </dl>
        </section>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Manage subscription</h2>
          <div className={styles.tilesContainer}>
            <Tile className={styles.tile}>
              <header>
                <h2 className={styles.tileTitle}>Explorer</h2>
                <p className={styles.tileDescription}>Explore and discover.</p>
              </header>
              <div>
                <Button
                  disabled={selectedTier.product === Tiers.Explorer}
                  kind="tertiary"
                  onClick={handleOnClick(SubscriptionConfigs[Tiers.Explorer])}
                  className={styles.tileButton}
                >
                  {selectedTier.product === Tiers.Explorer ? "Current Plan" : "Change Plan"}
                </Button>
              </div>
              <UnorderedList>
                <ListItem>Visual Drag-and-Drop Workflow Editor</ListItem>
                <ListItem>Single User</ListItem>
                <ListItem>2 workflows</ListItem>
                <ListItem>10 executions per month</ListItem>
                <ListItem>10 min execution duration</ListItem>
              </UnorderedList>
            </Tile>
            <Tile className={styles.tile}>
              <header>
                <h2 className={styles.tileTitle}>Starter</h2>
                <p className={styles.tileDescription}>Start with the basics.</p>
              </header>
              <div>
                <Button
                  disabled={selectedTier.product === Tiers.Starter}
                  kind="tertiary"
                  onClick={handleOnClick(SubscriptionConfigs[Tiers.Starter])}
                  className={styles.tileButton}
                >
                  {selectedTier.product === Tiers.Starter ? "Current Plan" : "Change Plan"}
                </Button>
              </div>
              <UnorderedList>
                <ListItem>Visual Drag-and-Drop Workflow Editor</ListItem>
                <ListItem>Single User</ListItem>
                <ListItem>20 workflows</ListItem>
                <ListItem>100 executions per month</ListItem>
                <ListItem>2 concurrent executions</ListItem>
                <ListItem>1 hr execution duration</ListItem>
              </UnorderedList>
            </Tile>
            <Tile className={styles.tile}>
              <header>
                <h2 className={styles.tileTitle}>Maker</h2>
                <p className={styles.tileDescription}>Expand your automation.</p>
              </header>
              <div>
                <Button
                  disabled={selectedTier.product === Tiers.Maker}
                  kind="tertiary"
                  onClick={handleOnClick(SubscriptionConfigs[Tiers.Maker])}
                  className={styles.tileButton}
                >
                  {selectedTier.product === Tiers.Maker ? "Current Plan" : "Change Plan"}
                </Button>
              </div>
              <UnorderedList>
                <ListItem>Visual Drag-and-Drop Workflow Editor</ListItem>
                <ListItem>Unlimited User Teams</ListItem>
                <ListItem>200 workflows</ListItem>
                <ListItem>1,000 executions per month</ListItem>
                <ListItem>10 concurrent executions</ListItem>
                <ListItem>4 hr execution duration</ListItem>
                <ListItem>Custom Tasks</ListItem>
              </UnorderedList>
            </Tile>
            <Tile className={styles.tile}>
              <header>
                <h2 className={styles.tileTitle}>Scaler</h2>
                <p className={styles.tileDescription}>For established automation.</p>
              </header>
              <div>
                <Button
                  disabled={selectedTier.product === Tiers.Scaler}
                  kind="tertiary"
                  onClick={handleOnClick(SubscriptionConfigs[Tiers.Scaler])}
                  className={styles.tileButton}
                >
                  {selectedTier.product === Tiers.Scaler ? "Current Plan" : "Change Plan"}
                </Button>
              </div>
              <UnorderedList>
                <ListItem>Visual Drag-and-Drop Workflow Editor</ListItem>
                <ListItem>Unlimited User Teams</ListItem>
                <ListItem>1,000 workflows</ListItem>
                <ListItem>20,000 executions per month</ListItem>
                <ListItem>100 concurrent executions</ListItem>
                <ListItem>24 hr execution duration</ListItem>
                <ListItem>Custom Tasks</ListItem>
              </UnorderedList>
            </Tile>
          </div>
        </section>
        <section className={styles.buttonsContainer}>
          <Button enabled kind="danger" renderIcon={Delete16} onClick={handleCancel}>
            Cancel Subscription
          </Button>
        </section>
      </div>
    </article>
  );
}
