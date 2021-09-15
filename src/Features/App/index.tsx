import React from "react";
import AppContext from "State/appContext";
import { useAuth } from "Hooks/useFirebase";
import { Header, HeaderName, SkipToContent } from "carbon-components-react";
import { ErrorBoundary, Loading } from "@boomerang-io/carbon-addons-boomerang-react";
import ErrorDragon from "Components/ErrorDragon";
import Main from "./Main";
import { AppLink } from "Config/appConfig";

export function App() {
  const { user, isAuthenticating } = useAuth();

  // things are loading
  if (!user && isAuthenticating) {
    return <Loading />;
  }

  return (
    <>
      {user && <LocalHeader />}
      <ErrorBoundary errorComponent={ErrorDragon}>
        <AppContext.Provider value={{ user: user ?? {}, navigation: {} }}>
          <Main user={user} />
        </AppContext.Provider>
      </ErrorBoundary>
    </>
  );
}

function LocalHeader() {
  return (
    <Header aria-label="flowabl">
      <SkipToContent href="#content" />
      <HeaderName href={AppLink.Root()} prefix="">
        flowabl
      </HeaderName>
    </Header>
  );
}

export default App;
