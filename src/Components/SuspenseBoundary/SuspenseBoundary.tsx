import * as React from "react";
import { DelayedRender, Loading } from "@boomerang-io/carbon-addons-boomerang-react";

export default function SuspenseBoundary(props: { children: React.ReactNode }) {
  return (
    <React.Suspense
      fallback={
        <DelayedRender>
          <Loading />
        </DelayedRender>
      }
    >
      {props.children}
    </React.Suspense>
  );
}
