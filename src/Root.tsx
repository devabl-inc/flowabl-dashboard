import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ErrorBoundary } from "@boomerang-io/carbon-addons-boomerang-react";
import { AuthProvider } from "Hooks/useFirebase";
import ErrorDragon from "Components/ErrorDragon";
import App from "Features/App";
import { APP_ROOT, isDevEnv, isTestEnv } from "Config/appConfig";

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});


function Root() {
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary errorComponent={ErrorDragon}>
        <ReactQueryDevtools initialIsOpen={false} />
          <BrowserRouter basename={APP_ROOT}>
            <AuthProvider>
              <App />
            </AuthProvider>
          </BrowserRouter>
      </ErrorBoundary>
    </QueryClientProvider>
  );
}

export default Root;
