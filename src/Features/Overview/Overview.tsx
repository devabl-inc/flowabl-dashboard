import React from "react";
import { Button, FeatureHeaderTitle } from "@boomerang-io/carbon-addons-boomerang-react";
import { Rocket16, Upgrade16, WorkspaceImport16, Events16 } from "@carbon/icons-react";
import styles from "./Overview.module.scss";

export default function Overview() {
  return (
    <>
      <div className={styles.header}>
        <h1>Welcome</h1>
      </div>
      <div className={styles.container}>
        <FeatureHeaderTitle>
          Hello, user!{" "}
          <span role="img" aria-label="Hi!">
            👋
          </span>
        </FeatureHeaderTitle>
        <p style={{ marginTop: "1rem" }}>
          Thanks for taking a look. We want you to get the most out of Flowabl. Here are a few things to get started
          with make your experience a good one.
        </p>
        <CheckoutSection
          title="Create your first workflow"
          text="Creating your first workflow is simple. Go to the app and do this. Do that. Etc. etc. look at the documentation if you have any questions!"
          icon={<Rocket16 />}
        />
        <CheckoutSection
          title="Create a team"
          text="Creating your first workflow is simple. Go to the app and do this. Do that. Etc. etc. look at the documentation if you have any questions!"
          icon={<Events16 />}
        />
        <CheckoutSection
          title="Use a template"
          text="We have a number of handy, pre-built workflwo templates to get started quickly. Go to the app and do this. Do that. Etc. etc. look at the documentation if you have any questions!"
          icon={<WorkspaceImport16 />}
        />
        <CheckoutSection
          title="Embrace, extend, and embrace again"
          text="Extend Flowabl with custom workflows. Contribute to the growing ecosystem of actions in the open source."
          icon={<Upgrade16 />}
        />
        <section className={styles.buttonsContainer}>
          <Button renderIcon={Rocket16}>Launch Flowabl</Button>
        </section>
      </div>
    </>
  );
}

function CheckoutSection(props: { title: string; text: React.ReactNode; icon: React.ReactNode }) {
  return (
    <section className={styles.checkoutContainer}>
      <div className={styles.checkoutTitleContainer}>
        <div className={styles.checkoutIcon}>{props.icon}</div>
        <h2 className={styles.checkoutTitle}>{props.title}</h2>
      </div>
      <p className={styles.checkoutText}>{props.text}</p>
    </section>
  );
}
