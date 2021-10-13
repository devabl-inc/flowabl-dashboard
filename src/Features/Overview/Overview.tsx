import * as React from "react";
import { Button, Link } from "@boomerang-io/carbon-addons-boomerang-react";
import { Link as RRLink } from "react-router-dom";
import { useAuth } from "Hooks/useFirebase";
import { APP_URL, DOCS_URL, OSS_URL, AppLink } from "Config/appConfig";
import { Rocket24, Upgrade24, WorkspaceImport24, Events24, Launch16, ThumbsUp24 } from "@carbon/icons-react";
import styles from "./Overview.module.scss";

export default function Overview() {
  const { user, subscription } = useAuth();
  return (
    <article className={styles.container}>
      <header className={styles.header}>
        <h1 style={{ color: "white" }}>Welcome</h1>
      </header>
      <div className={styles.content}>
        <h2 style={{ fontSize: "1.625rem", fontWeight: 600 }}>
          <span>{`Hello, ${user?.displayName ?? "Ada!"} `}</span>
          <span role="img" aria-label="Hi!">
            👋
          </span>
        </h2>
        <p style={{ marginTop: "1rem" }}>
          Thanks for taking a look! We want you to get the most out of Flowabl. Here are a few things to get started
          with to make your experience a good one.
        </p>
        <p style={{ marginTop: "1rem" }}>
          Tier: <strong>{subscription?.name ?? ""}</strong>
        </p>
        <section className={styles.buttonsContainer}>
          <a rel="noopener nofollow noreferrer" target="_blank" href={APP_URL}>
            <Button renderIcon={Rocket24} style={{ background: "#003d73" }}>
              Launch Flowabl
            </Button>
          </a>
        </section>
        <CheckoutSection
          title="Create your first workflow"
          text={
            <span>
              Creating your first workflow is simple. Start from scratch or a template and start dragging and dropping
              your way to automation.{" "}
              <Link
                rel="noopener nofollow noreferrer"
                target="_blank"
                href={APP_URL}
                style={{ display: "inline-flex", alignItems: "center" }}
              >
                Launch Flowabl to get started! <Launch16 style={{ marginLeft: "0.25rem" }} />
              </Link>
            </span>
          }
          icon={<Rocket24 fill="#009d9a" />}
        />
        <CheckoutSection
          title="Get started with a template"
          text={
            <span>
              We have a number of handy, pre-built workflow templates for common use cases to get started quickly. Have
              a{" "}
              <Link
                rel="noopener nofollow noreferrer"
                target="_blank"
                href={DOCS_URL}
                style={{ display: "inline-flex", alignItems: "center" }}
              >
                look at the documentation <Launch16 style={{ marginLeft: "0.25rem" }} />
              </Link>{" "}
              or reach out to support if you have any questions.
            </span>
          }
          icon={<WorkspaceImport24 fill="#00597e" />}
        />
        <CheckoutSection
          title="Create a team"
          text="Share your workflows with others, define shared parameters and secrets, and empower your organization."
          icon={<Events24 fill="#017288" />}
        />
        <CheckoutSection
          title="Embrace, extend, and embrace again"
          text={
            <span>
              Extend Flowabl with custom tasks and workflows. Contribute to the growing ecosystem of tasks in the open
              source project,{" "}
              <Link
                rel="noopener nofollow noreferrer"
                target="_blank"
                href={OSS_URL}
                style={{ display: "inline-flex", alignItems: "center" }}
              >
                Boomerang Flow
                <Launch16 style={{ marginLeft: "0.25rem" }} />
              </Link>
            </span>
          }
          icon={<Upgrade24 fill="#003d73" />}
        />
        <CheckoutSection
          title="Stay in control"
          text={
            <span>
              Listen for events to trigger workflows. Take action on manual tasks. Hold off with approvals. You are in
              control of your workflows with Flowabl.
            </span>
          }
          icon={<ThumbsUp24 fill="#061727" />}
        />
        <section className={styles.callToActionContainer}>
          <RRLink to={AppLink.Subscription()}>
            <div className={styles.callToAction}>Need to do more? Upgrade your tier on the subscription page.</div>
          </RRLink>
        </section>
      </div>
    </article>
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
