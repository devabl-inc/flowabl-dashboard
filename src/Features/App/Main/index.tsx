import * as React from "react";
import { Switch } from "react-router-dom";
import { Error404, NotificationsContainer } from "@boomerang-io/carbon-addons-boomerang-react";
import Login from "Features/Login";
import Layout from "Components/Layout";
import PrivateRoute from "Components/PrivateRoute";
import { AppPath } from "Config/appConfig";
import { User } from "@firebase/auth";
import styles from "./main.module.scss";

import Overview from "Features/Overview";
import Profile from "Features/Profile";
import Subscription from "Features/Subscription";
import Support from "Features/Support";
import Logout from "Features/Logout";
import Signup from "Features/Signup";

// const Overview = React.lazy(() => import(/* webpackChunkName: "Overview" */ "Features/Overview"));
// const Profile = React.lazy(() => import(/* webpackChunkName: "Profile" */ "Features/Profile"));
// const Subscription = React.lazy(() => import(/* webpackChunkName: "Subscription" */ "Features/Subscription"));
// const Support = React.lazy(() => import(/* webpackChunkName: "Support" */ "Features/Support"));
// const Logout = React.lazy(() => import(/* webpackChunkName: "Logout" */ "Features/Logout"));
// const Signup = React.lazy(() => import(/* webpackChunkName: "Signup" */ "Features/Signup"));

interface MainProps {
  user: User;
}

function Main({ user }: MainProps) {
  return (
    <main id="content" className={styles.container}>
        <Switch>
          <PrivateRoute exact path={AppPath.Signup} condition={Boolean(!user)} redirectPath="">
            <Signup />
          </PrivateRoute>
          <PrivateRoute exact path={AppPath.Login} condition={Boolean(!user)} redirectPath="">
            <Login />
          </PrivateRoute>
          <PrivateRoute exact path={AppPath.Root} condition={Boolean(user)}>
            <Layout title="Welcome" description="Welcome page for Flowabl">
              <Overview />
            </Layout>
          </PrivateRoute>
          <PrivateRoute exact path={AppPath.Profile} condition={Boolean(user)}>
            <Layout title="Profile" description="Profile page for Flowabl">
              <Profile />
            </Layout>
          </PrivateRoute>
          <PrivateRoute exact path={AppPath.Subscription} condition={Boolean(user)}>
            <Layout title="Subscription" description="Subscription page for Flowabl">
              <Subscription />
            </Layout>
          </PrivateRoute>
          <PrivateRoute exact path={AppPath.Support} condition={Boolean(user)}>
            <Layout title="Support" description="Support page for Flowabl">
              <Support />
            </Layout>
          </PrivateRoute>
          <PrivateRoute exact path={AppPath.Logout} condition={Boolean(user)}>
            <Layout title="Logout" description="Logout page for Flowabl">
              <Logout />
            </Layout>
          </PrivateRoute>
          <PrivateRoute path={"*"} condition={Boolean(user)}>
            <Layout title="404" description="404 page not found for Flowabl">
              <Error404 />
            </Layout>
          </PrivateRoute>
        </Switch>
      <NotificationsContainer enableMultiContainer />
    </main>
  );
}

export default React.memo(Main);
