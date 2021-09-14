import React from "react";
import AppContext from "State/appContext";
import { useAuth } from "Hooks/useFirebase";
import Chatwoot from "Components/Chatwoot";
import { Button, ErrorBoundary, Loading } from "@boomerang-io/carbon-addons-boomerang-react";
import ErrorDragon from "Components/ErrorDragon";
import Main from "./Main";
import Navbar from "./Navbar";
import { isProdEnv } from "Config/appConfig";
import { PRODUCT_ENV_URL } from "Config/platformUrlConfig";

export function App() {
  const { user, isAuthenticating, signInWithPopup } = useAuth();

  // things are loading
  if (isAuthenticating) {
    return (
      <>
        <Navbar navigation={{}} user={{}} />
        <Loading />
      </>
    );
  }

  // if we have tried to authenticate and the user doesn't exist
  if (!user && !isAuthenticating) {
    if (isProdEnv) {
      window.location.href = PRODUCT_ENV_URL;
    } else {
      return (
        <>
          <Navbar />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "calc(100vh - 3rem)",
            }}
          >
            <p style={{ marginBottom: "1rem" }}>Running in DEVELOPMENT mode, please sign in</p>
            <Button onClick={signInWithPopup}>Sign in</Button>
          </div>
        </>
      );
    }
  }

  // only show the app if we have a user
  if (user) {
    return (
      <>
        <Navbar navigation={{}} user={user ?? {}} />
        <ErrorBoundary errorComponent={ErrorDragon}>
          <AppContext.Provider value={{ user: user ?? {}, navigation: {} }}>
            <Main user={user ?? {}} />
            <Chatwoot />
          </AppContext.Provider>
        </ErrorBoundary>
      </>
    );
  }

  return null;
}

export default App;
