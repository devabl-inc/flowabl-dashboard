import React from "react";
import AppContext from "State/appContext";
import { useAuth } from "Hooks/useFirebase";
import Chatwoot from "Components/Chatwoot";
import { ErrorBoundary, Loading } from "@boomerang-io/carbon-addons-boomerang-react";
import ErrorDragon from "Components/ErrorDragon";
import Main from "./Main";
import Navbar from "./Navbar";

export function App() {
  const { user, isAuthenticating } = useAuth();

  // things are loading
  if (!user && isAuthenticating) {
    return <Loading />;
  }

  return (
    <>
      {user && <Navbar navigation={{}} user={user ?? {}} />}
      <ErrorBoundary errorComponent={ErrorDragon}>
        <AppContext.Provider value={{ user: user ?? {}, navigation: {} }}>
          <Main user={user} />
          {user && <Chatwoot />}
        </AppContext.Provider>
      </ErrorBoundary>
    </>
  );
}

export default App;
