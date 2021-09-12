import React from "react";
import {
  Button,
  FeatureHeader,
  FeatureHeaderTitle,
  FeatureHeaderSubtitle,
  TextInput,
} from "@boomerang-io/carbon-addons-boomerang-react";
import { Delete16 } from "@carbon/icons-react";
import styles from "./Profile.module.scss";

export default function Profile() {
  const [name, setName] = React.useState("Ada");
  const handleDelete = () => {
    alert(`Are you sure? Everything will be gone.`);
  };
  return (
    <article>
      <FeatureHeader includeBorder={false}>
        <FeatureHeaderTitle>Profile</FeatureHeaderTitle>
        <FeatureHeaderSubtitle>All that we know about you</FeatureHeaderSubtitle>
      </FeatureHeader>
      <div className={styles.container}>
        <section>
          <h2 className={styles.sectionTitle}>Your info</h2>
          <dl className={styles.infoContainer}>
            <div>
              <dd className={styles.infoLabel}>Name</dd>
              <dt className={styles.infoText}>
                <TextInput
                  value={name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                />
              </dt>
            </div>
            <div>
              <dd className={styles.infoLabel}>Email</dd>
              <dt className={styles.infoText}>ada@flowabl.io</dt>
            </div>
          </dl>
        </section>
        <section className={styles.buttonsContainer}>
          <Button disabled={name === "Ada" || name === ""} kind="danger--tertiary">
            Cancel
          </Button>
          <Button disabled={name === "Ada" || name === ""}>Update</Button>
        </section>
        <section className={styles.buttonsContainer}>
          <Button kind="danger" renderIcon={Delete16} onClick={handleDelete}>
            Delete Account
          </Button>
        </section>
      </div>
    </article>
  );
}
