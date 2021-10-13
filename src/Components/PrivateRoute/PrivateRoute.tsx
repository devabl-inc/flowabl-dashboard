import * as React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";

interface PrivateRouteProps extends RouteProps {
  condition: boolean;
  path: string;
  redirectPath?: string;
}

export default function PrivateRoute(props: PrivateRouteProps) {
  const { children, condition, redirectPath = "/login", ...rest } = props;
  return (
    <Route
      {...rest}
      render={() => {
        return condition ? children : <Redirect to={{ pathname: redirectPath }} />;
      }}
    />
  );
}
