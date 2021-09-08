//@ts-nocheck
import React, { Suspense, lazy } from "react";
import PropTypes from "prop-types";
import { Switch, Route } from "react-router-dom";
import { Button, FeatureHeaderTitle, Tile, DelayedRender, Error404, NotificationsContainer, Loading } from "@boomerang-io/carbon-addons-boomerang-react";
import Layout from "Components/Layout";
import { Rocket16 } from "@carbon/icons-react";
import { AppPath } from "Config/appConfig";
import styles from "./main.module.scss";

Main.propTypes = {
  user: PropTypes.object.isRequired,
};

const Profile = lazy(() => import(/* webpackChunkName: "Users" */ "Features/Profile"));
const Subscription = lazy(() => import(/* webpackChunkName: "Users" */ "Features/Subscription"));
const Support = lazy(() => import(/* webpackChunkName: "Users" */ "Features/Support"));

function Main({ user }) {
  return (
    <div className={styles.container}>
      <Layout>
      <Suspense
        fallback={
          <DelayedRender>
            <Loading />
          </DelayedRender>
        }
      > 
        
          <Switch>
            <Route exact path={AppPath.Root}>
              <article className={styles.welcome}>
                <FeatureHeaderTitle>Welcome, user!</FeatureHeaderTitle>
                <p>Check out the following to get started with Flowabl</p>
                <section className={styles.tileContainer}>
                <Tile className={styles.tile}><h2>Do this!</h2></Tile>
                <Tile className={styles.tile}><h2>Do that!</h2></Tile>
                </section>
                <section className={styles.buttonsContainer}>
                  <Button renderIcon={Rocket16}>Launch Flowabl</Button>
                </section>
              </article>
            </Route>
            <Route path={AppPath.Profile}>
              <Profile />
            </Route>
            <Route path={AppPath.Subscription}>
              <Subscription />
            </Route>
            <Route path={AppPath.Support}>
              <Support  />
            </Route>
            <Route path={"*"}>
              <Error404 />
            </Route>
          </Switch>
      </Suspense>
      </Layout>
      <NotificationsContainer enableMultiContainer />
    </div>
  );
}

export default React.memo(Main);
