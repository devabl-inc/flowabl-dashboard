//@ts-nocheck
import React, { Suspense, lazy } from "react";
import PropTypes from "prop-types";
import { Switch, Route } from "react-router-dom";
import { DelayedRender, Error404, NotificationsContainer, Loading } from "@boomerang-io/carbon-addons-boomerang-react";
import Layout from "Components/Layout";
import { AppPath } from "Config/appConfig";
import styles from "./main.module.scss";

Main.propTypes = {
  user: PropTypes.object.isRequired,
};

const Overview = lazy(() => import(/* webpackChunkName: "Overview" */ "Features/Overview"));
const Overview2 = lazy(() => import(/* webpackChunkName: "Overview2" */ "Features/Overview2"));
const Overview3 = lazy(() => import(/* webpackChunkName: "Overview3" */ "Features/Overview3"));
const Overview4 = lazy(() => import(/* webpackChunkName: "Overview4" */ "Features/Overview4"));
const Profile = lazy(() => import(/* webpackChunkName: "Profile" */ "Features/Profile"));
const Subscription = lazy(() => import(/* webpackChunkName: "Subscription" */ "Features/Subscription"));
const Support = lazy(() => import(/* webpackChunkName: "Support" */ "Features/Support"));

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
              <Overview />
            </Route>
            <Route exact path={"/overview2"}>
              <Overview2 />
            </Route>
            <Route exact path={"/overview3"}>
              <Overview3 />
            </Route>
            <Route exact path={"/overview4"}>
              <Overview4 />
            </Route>
            <Route path={AppPath.Profile}>
              <Profile />
            </Route>
            <Route path={AppPath.Subscription}>
              <Subscription />
            </Route>
            <Route path={AppPath.Support}>
              <Support />
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
