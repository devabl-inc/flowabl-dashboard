import * as React from "react";
import {
  Button,
  FeatureHeader,
  FeatureHeaderTitle,
  FeatureHeaderSubtitle,
} from "@boomerang-io/carbon-addons-boomerang-react";
import { useAuth } from "Hooks";
import { Delete16 } from "@carbon/icons-react";
import styles from "./Profile.module.scss";

export default function Profile() {
  const { user } = useAuth();
  //const [name, setName] = React.useState(user?.displayName ?? "");

  const handleDelete = () => {
    alert(`Are you sure? All of your data will be gone.`);
  };

  return (
    <article>
      <FeatureHeader includeBorder={false}>
        <FeatureHeaderTitle>Profile</FeatureHeaderTitle>
        <FeatureHeaderSubtitle>What we know about you</FeatureHeaderSubtitle>
      </FeatureHeader>
      <div className={styles.container}>
        <section>
          <h2 className={styles.sectionTitle}>Your info</h2>
          <dl className={styles.infoContainer}>
            <div>
              <dd className={styles.infoLabel}>Name</dd>
              <dt className={styles.infoText}>{user?.displayName ?? ""}</dt>
            </div>
            <div>
              <dd className={styles.infoLabel}>Email</dd>
              <dt className={styles.infoText}>{user?.email ?? ""}</dt>
            </div>
          </dl>
        </section>
        {/* <section className={styles.buttonsContainer}>
            <Button disabled={name === user.displayName || name === ""} kind="danger--tertiary">
              Cancel
            </Button>
            <Button renderIcon={Save16} disabled={name === user.displayName || name === ""}>
              Update
            </Button>
          </section> */}
        <section className={styles.buttonsContainer}>
          <Button disabled kind="danger" renderIcon={Delete16} onClick={handleDelete}>
            Delete Account (coming soon!)
          </Button>
        </section>
      </div>
    </article>
  );
}
