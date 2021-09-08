import React from 'react'
import { Button, FeatureHeader, FeatureHeaderTitle, FeatureHeaderSubtitle } from "@boomerang-io/carbon-addons-boomerang-react";
import { Delete16 } from '@carbon/icons-react';
import styles from "./Profile.module.scss";

export default function Profile() {
    const handleDelete = () => {
        alert(`Are you sure? Everything will be gone.`);
    }
    return (
        <article className={styles.container}>
                            <FeatureHeader >
                    <FeatureHeaderTitle>Profile</FeatureHeaderTitle>
                    <FeatureHeaderSubtitle>All (not much) about you</FeatureHeaderSubtitle>
                </FeatureHeader>
                <div className={styles.infoContainer}>
                <div>Name</div>
                <div>User name</div>
                <div>Email</div>
                <div>User email</div>
                </div>
                <section className={styles.buttonsContainer}>

                <Button kind="danger">Cancel</Button>
                <Button>Save</Button>
                </section>
                <section className={styles.buttonsContainer}>      
                <Button kind="danger" renderIcon={Delete16} onClick={handleDelete}>Delete Account</Button>
                </section>

        </article>
    )
}
