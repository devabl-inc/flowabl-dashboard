import React from "react";
import { Switch, Route } from "react-router-dom";
import { Error404, NotificationsContainer } from "@boomerang-io/carbon-addons-boomerang-react";
import Login from "Features/Login";
import Layout from "Components/Layout";
import PrivateRoute from "Components/PrivateRoute";
import SuspenseBoundary from "Components/SuspenseBoundary";
import { AppPath } from "Config/appConfig";
import { User } from "@firebase/auth";
import styles from "./main.module.scss";

const Overview = React.lazy(() => import(/* webpackChunkName: "Overview" */ "Features/Overview"));
const Profile = React.lazy(() => import(/* webpackChunkName: "Profile" */ "Features/Profile"));
const Subscription = React.lazy(() => import(/* webpackChunkName: "Subscription" */ "Features/Subscription"));
const Support = React.lazy(() => import(/* webpackChunkName: "Support" */ "Features/Support"));
const Logout = React.lazy(() => import(/* webpackChunkName: "Logout" */ "Features/Logout"));
const Signup = React.lazy(() => import(/* webpackChunkName: "Signup" */ "Features/Signup"));

interface MainProps {
  user: User;
}

function Main({ user }: MainProps) {
  return (
    <main id="content" className={styles.container}>
      <Switch>
        <PrivateRoute exact path={AppPath.Signup} condition={Boolean(!user)} redirectPath="">
          <SuspenseBoundary>
            <Signup />
          </SuspenseBoundary>
        </PrivateRoute>
        <PrivateRoute exact path={AppPath.Login} condition={Boolean(!user)} redirectPath="">
          <SuspenseBoundary>
            <Login />
          </SuspenseBoundary>
        </PrivateRoute>
        <PrivateRoute exact path={AppPath.Root} condition={Boolean(user)}>
          <Layout title="Welcome">
            <Overview />
          </Layout>
        </PrivateRoute>
        <PrivateRoute exact path={AppPath.Profile} condition={Boolean(user)}>
          <Layout title="Profile">
            <Profile />
          </Layout>
        </PrivateRoute>
        <PrivateRoute exact path={AppPath.Subscription} condition={Boolean(user)}>
          <Layout title="Subscription">
            <Subscription />
          </Layout>
        </PrivateRoute>
        <PrivateRoute exact path={AppPath.Support} condition={Boolean(user)}>
          <Layout title="Support">
            <Support />
          </Layout>
        </PrivateRoute>
        <PrivateRoute exact path={AppPath.Logout} condition={Boolean(user)}>
          <Layout title="Logout">
            <Logout />
          </Layout>
        </PrivateRoute>
        <Route path={"*"}>
          <Layout title="404">
            <Error404 />
          </Layout>
        </Route>
      </Switch>
      <NotificationsContainer enableMultiContainer />
    </main>
  );
}

export default React.memo(Main);
