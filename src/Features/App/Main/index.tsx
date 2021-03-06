import * as React from "react";
import { Switch, useHistory } from "react-router-dom";
import { Error404, Loading, NotificationsContainer } from "@boomerang-io/carbon-addons-boomerang-react";
import Login from "Features/Login";
import Layout from "Components/Layout";
import PrivateRoute from "Components/PrivateRoute";
import { useAuth, useQueryParams, getSignUpToken, deleteSignUpToken } from "Hooks";
import { AppPath } from "Config/appConfig";
import type { User } from "@firebase/auth";
import styles from "./main.module.scss";

import Overview from "Features/Overview";
import Profile from "Features/Profile";
import Subscription from "Features/Subscription";
import Support from "Features/Support";
import Logout from "Features/Logout";
import Signup from "Features/Signup";
import { resolver } from "Config/servicesConfig";

// const Overview = React.lazy(() => import(/* webpackChunkName: "Overview" */ "Features/Overview"));
// const Profile = React.lazy(() => import(/* webpackChunkName: "Profile" */ "Features/Profile"));
// const Subscription = React.lazy(() => import(/* webpackChunkName: "Subscription" */ "Features/Subscription"));
// const Support = React.lazy(() => import(/* webpackChunkName: "Support" */ "Features/Support"));
// const Logout = React.lazy(() => import(/* webpackChunkName: "Logout" */ "Features/Logout"));
// const Signup = React.lazy(() => import(/* webpackChunkName: "Signup" */ "Features/Signup"));

interface MainProps {
  user?: User;
}

function Main({ user }: MainProps) {
  const { isRedirecting, setIsRedirecting } = useAuth();
  const queryParams = useQueryParams();
  const history = useHistory();

  const signUpToken = queryParams.get("signUpToken");

  React.useEffect(() => {
    async function getTokenDoc(signUpToken: string, email: string) {
      let signUpTokenDoc;
      signUpTokenDoc = await getSignUpToken(signUpToken, email);
      if (signUpTokenDoc) {
        const data = signUpTokenDoc.data();
        await resolver.postSubscription(data);
        await deleteSignUpToken(signUpTokenDoc);
        setIsRedirecting(false);
        history.push({
          pathname: "/",
          search: "",
        });
      } else {
        setIsRedirecting(false);
        history.push({
          pathname: "/",
          search: "",
        });
      }
    }

    if (signUpToken && user?.email) {
      getTokenDoc(signUpToken, user.email).catch((e) => {
        console.log("Something went wrong creating your account. Try again.");
      });
    }
  }, [signUpToken, user?.email]);

  if (isRedirecting || signUpToken) {
    return (
      <div className={styles.container}>
        <Loading />;
      </div>
    );
  }

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
