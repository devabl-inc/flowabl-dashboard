import React from "react";
import { Button, FeatureHeaderTitle, Link } from "@boomerang-io/carbon-addons-boomerang-react";
//import { Link as RRLink } from "react-router-dom";
import Layout from "Components/Layout";
import { useAuth } from "Hooks/useFirebase";
import { APP_URL, DOCS_URL } from "Config/appConfig";
import { Rocket24, Upgrade24, WorkspaceImport24, Events24, Launch16 } from "@carbon/icons-react";
import styles from "./Overview.module.scss";

export default function Overview() {
  const { user, subscription } = useAuth();
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 style={{ color: "white" }}>Welcome</h1>
        </div>
        <div className={styles.content}>
          <FeatureHeaderTitle>
            <span>{`Hello, ${user?.displayName ?? "Ada!"} `}</span>
            <span role="img" aria-label="Hi!">
              👋
            </span>
          </FeatureHeaderTitle>
          <p style={{ marginTop: "1rem" }}>
            Thanks for taking a look. We want you to get the most out of flowabl. Here are a few things to get started
            with make your experience a good one.
          </p>
          <p style={{ marginTop: "1rem" }}>
            Tier: <strong>{subscription?.name ?? ""}</strong>
          </p>
          <section className={styles.buttonsContainer}>
            <a rel="noopener nofollow noreferrer" target="_blank" href={APP_URL}>
              <Button renderIcon={Rocket24} style={{ background: "#003d73" }}>
                Launch flowabl
              </Button>
            </a>
          </section>
          <CheckoutSection
            title="Create your first workflow"
            text={
              <span>
                Creating your first workflow is simple. Start from scratch or from a template. Take a look at the
                documentation if you have any questions.{" "}
                <Link
                  rel="noopener nofollow noreferrer"
                  target="_blank"
                  href={APP_URL}
                  style={{ display: "inline-flex", alignItems: "center" }}
                >
                  Launch flowabl to get started! <Launch16 style={{ marginLeft: "0.25rem" }} />
                </Link>
              </span>
            }
            icon={<Rocket24 fill="#009d9a" />}
          />
          <CheckoutSection
            title="Get started with a template"
            text={
              <span>
                We have a number of handy, pre-built workflow templates for common use cases to get started quickly.
                Have a look at{" "}
                <Link
                  rel="noopener nofollow noreferrer"
                  target="_blank"
                  href={DOCS_URL}
                  style={{ display: "inline-flex", alignItems: "center" }}
                >
                  the documentation <Launch16 style={{ marginLeft: "0.25rem" }} />
                </Link>{" "}
                if you have any questions!"
              </span>
            }
            icon={<WorkspaceImport24 fill="#00597e" />}
          />
          <CheckoutSection
            title="Create a team"
            text="Share your workflows with others, create custom tasks, define shared parameters and secrets, and empower your organization. "
            icon={<Events24 fill="#017288" />}
          />
          <CheckoutSection
            title="Embrace, extend, and embrace again"
            text="Extend flowabl with custom workflows. Contribute to the growing ecosystem of actions in the open source."
            icon={<Upgrade24 fill="#003d73" />}
          />
          {/* <CheckoutSection
            title="Need to do more?"
            text={
              <span>
                Are you running out of executions? Or need to create more workflows? You can upgrade your subscription
                tier at any time. <RRLink to={AppLink.Subscription()}>Head to the subscription page</RRLink> to see your
                options.
              </span>
            }
            icon={<Help24 fill="#061727" />}
          />
          <section className={styles.callToActionContainer}>
            <RRLink to={AppLink.Subscription()}>
              <div className={styles.callToAction}>Upgrade or change your tier on the subscription page</div>
            </RRLink>
          </section> */}
        </div>
      </div>
    </Layout>
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
