//@ts-nocheck
import React, { Suspense, lazy } from "react";
import PropTypes from "prop-types";
import { Switch, Route } from "react-router-dom";
import { DelayedRender, Error404, NotificationsContainer, Loading } from "@boomerang-io/carbon-addons-boomerang-react";
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
    <main id="content" className={styles.container}>
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
              <h1>Welcome!</h1>
              <p>Boomerang Flow Dashboard :0</p>
              <br />
              <p>Select the hamburger menu to navigate to other pages.</p>
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
      <NotificationsContainer enableMultiContainer />
    </main>
  );
}

export default React.memo(Main);
