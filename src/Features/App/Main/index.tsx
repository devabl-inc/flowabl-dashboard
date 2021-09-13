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
const Profile = lazy(() => import(/* webpackChunkName: "Profile" */ "Features/Profile"));
const Subscription = lazy(() => import(/* webpackChunkName: "Subscription" */ "Features/Subscription"));
const Support = lazy(() => import(/* webpackChunkName: "Support" */ "Features/Support"));
const Logout = lazy(() => import(/* webpackChunkName: "Logout" */ "Features/Logout"));

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
            <Route path={AppPath.Profile}>
              <Profile />
            </Route>
            <Route path={AppPath.Subscription}>
              <Subscription />
            </Route>
            <Route path={AppPath.Support}>
              <Support />
            </Route>
            <Route path={AppPath.Logout}>
              <Logout />
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
