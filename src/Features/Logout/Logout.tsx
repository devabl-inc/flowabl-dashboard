import React from "react";
import {
  Button,
  FeatureHeader,
  FeatureHeaderTitle,
  FeatureHeaderSubtitle,
} from "@boomerang-io/carbon-addons-boomerang-react";
import Layout from "Components/Layout";
import { useAuth } from "Hooks/useFirebase";
import { ArrowRight16 } from "@carbon/icons-react";
import styles from "./Logout.module.scss";

export default function Logout() {
  const { logout } = useAuth();

  return (
    <Layout>
      <article>
        <FeatureHeader includeBorder={false}>
          <FeatureHeaderTitle>Logout</FeatureHeaderTitle>
          <FeatureHeaderSubtitle>Take a break</FeatureHeaderSubtitle>
        </FeatureHeader>

        <section className={styles.container}>
          <Button
            renderIcon={ArrowRight16}
            onClick={(e: MouseEvent) => {
              e.preventDefault();
              logout();
            }}
          >
            Log Out
          </Button>
          <p style={{ marginTop: "0.5rem" }}>You'll be redirected to the flowabl login page.</p>
        </section>
      </article>
    </Layout>
  );
}
