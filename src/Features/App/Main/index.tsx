import React, { Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import { DelayedRender, Error404, NotificationsContainer, Loading } from "@boomerang-io/carbon-addons-boomerang-react";
import Login from "Features/Login";
import Signup from "Features/Signup";
import Overview from "Features/Overview";
import Profile from "Features/Profile";
import Subscription from "Features/Subscription";
import Support from "Features/Support";
import Logout from "Features/Logout";
import Layout from "Components/Layout";
import PrivateRoute from "Components/PrivateRoute";
import { AppPath } from "Config/appConfig";
import { User } from "@firebase/auth";
import styles from "./main.module.scss";

interface MainProps {
  user: User;
}

function Main({ user }: MainProps) {
  return (
    <div className={styles.container}>
      <Suspense
        fallback={
          <DelayedRender>
            <Loading />
          </DelayedRender>
        }
      >
        <Switch>
          <PrivateRoute exact path={AppPath.Signup} condition={Boolean(!user)} redirectPath="">
            <Signup />
          </PrivateRoute>
          <PrivateRoute exact path={AppPath.Login} condition={Boolean(!user)} redirectPath="">
            <Login />
          </PrivateRoute>
          <PrivateRoute exact path={AppPath.Root} condition={Boolean(user)}>
            <Overview />
          </PrivateRoute>
          <PrivateRoute exact path={AppPath.Profile} condition={Boolean(user)}>
            <Profile />
          </PrivateRoute>
          <PrivateRoute exact path={AppPath.Subscription} condition={Boolean(user)}>
            <Subscription />
          </PrivateRoute>
          <PrivateRoute exact path={AppPath.Support} condition={Boolean(user)}>
            <Support />
          </PrivateRoute>
          <PrivateRoute exact path={AppPath.Logout} condition={Boolean(user)}>
            <Logout />
          </PrivateRoute>
          <Route path={"*"}>
            <Layout>
              <Error404 />
            </Layout>
          </Route>
        </Switch>
      </Suspense>
      <NotificationsContainer enableMultiContainer />
    </div>
  );
}

export default React.memo(Main);
