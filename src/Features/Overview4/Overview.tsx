import React from "react";
import { Button, FeatureHeaderTitle, Link } from "@boomerang-io/carbon-addons-boomerang-react";
import { Link as RRLink } from "react-router-dom";
import { Rocket24 } from "@carbon/icons-react";
import styles from "./Overview.module.scss";

export default function Overview() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 style={{ color: "white" }}>Welcome</h1>
      </div>
      <div className={styles.content}>
        <FeatureHeaderTitle>
          <span> Hello, user! </span>
          <span role="img" aria-label="Hi!">
            👋
          </span>
        </FeatureHeaderTitle>
        <p style={{ marginTop: "1rem" }}>
          Thanks for taking a look. We want you to get the most out of Flowabl. Here are a few things to get started
          with make your experience a good one.
        </p>
        <section className={styles.buttonsContainer}>
          <Button renderIcon={Rocket24} style={{ background: "#003d73" }}>
            Launch Flowabl
          </Button>
        </section>
        <CheckoutSection
          title="Create your first workflow"
          text={
            <span>
              Creating your first workflow is simple. Go to the app and do this. Do that. Etc. etc. look at the
              documentation if you have any questions. <Link href="/">Launch Flowabl to get started!</Link>
            </span>
          }
          icon={
            <span role="img" aria-label="Hi!">
              🚀
            </span>
          }
        />
        <CheckoutSection
          title="Create a team"
          text="Creating your first workflow is simple. Go to the app and do this. Do that. Etc. etc. look at the documentation if you have any questions!"
          icon={
            <span role="img" aria-label="Hi!">
              👩‍👩‍👦
            </span>
          }
        />
        <CheckoutSection
          title="Use a template"
          text="We have a number of handy, pre-built workflwo templates to get started quickly. Go to the app and do this. Do that. Etc. etc. look at the documentation if you have any questions!"
          icon={
            <span role="img" aria-label="Hi!">
              💕
            </span>
          }
        />
        <CheckoutSection
          title="Embrace, extend, and embrace again"
          text="Extend Flowabl with custom workflows. Contribute to the growing ecosystem of actions in the open source."
          icon={
            <span role="img" aria-label="Hi!">
              🥰
            </span>
          }
        />
        <CheckoutSection
          title="Need to do more?"
          text={
            <span>
              Are you running out of executions? Or need to create more workflows? You can upgrade your subscription
              tier at any time. <RRLink to="/subscription">Head to the subscription page</RRLink> to see your options.
            </span>
          }
          icon={
            <span role="img" aria-label="Hi!">
              🥐
            </span>
          }
        />
      </div>
    </div>
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
