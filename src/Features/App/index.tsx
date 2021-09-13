//@ts-nocheck
import React from "react";
import { useQuery } from "react-query";
import { ErrorBoundary, Loading } from "@boomerang-io/carbon-addons-boomerang-react";
import AppContext from "State/appContext";
//import { useAuth } from "Hooks/useFirebase";
import Chatwoot from "Components/Chatwoot";
import ErrorDragon from "Components/ErrorDragon";
import Navbar from "./Navbar";
import Main from "./Main";
import { serviceUrl, resolver } from "Config/servicesConfig";

const userUrl = serviceUrl.resourceUserProfile();
const navigationUrl = serviceUrl.resourceNavigation();

export function App() {
  //const { user } = useAuth();
  const userQuery = useQuery({
    queryKey: userUrl,
    queryFn: resolver.query(userUrl),
  });
  const navQuery = useQuery({
    queryKey: navigationUrl,
    queryFn: resolver.query(navigationUrl),
  });

  if (userQuery.isLoading || navQuery.isLoading) {
    return <Loading />;
  }

  if (userQuery.error || navQuery.error) {
    return <ErrorDragon />;
  }

  return (
    <>
      <Navbar navigation={navQuery.data} user={userQuery.data} />
      <ErrorBoundary errorComponent={ErrorDragon}>
        <AppContext.Provider value={{ user: userQuery.data, navigation: navQuery.data }}>
          <Main user={userQuery.data} />
          <Chatwoot />
        </AppContext.Provider>
      </ErrorBoundary>
    </>
  );
}

export default App;
