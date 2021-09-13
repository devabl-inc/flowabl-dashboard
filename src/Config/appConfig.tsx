import { Tier } from "Utils/types";
/**
 * Used for setting up the root context that the application is server on
 * This allows the app to be easily deployed out to multiple environments without recompiling
 * This value is passed into the container at run time by the helm chart
 * and added to the window as a global variable by the @boomerang/boomerang-webapp-server
 */
export const APP_ROOT =
  window._SERVER_DATA && window._SERVER_DATA.APP_ROOT ? window._SERVER_DATA.APP_ROOT : "/BMRG_APP_ROOT_CONTEXT";

export const isDevEnv = process.env.NODE_ENV === "development";
export const isTestEnv = process.env.NODE_ENV === "test";
export const isProdEnv = process.env.NODE_ENV === "production";

export const AppPath = {
  Root: "/",
  Profile: "/profile",
  Subscription: "/subscription",
  Support: "/support",
  Logout: "/logout",
};

export const AppLink = {
  Root: () => "/",
  Subscription: "/subscription",
  Users: () => "/users",
  UsersCurrent: () => "/users/current",
  UsersList: () => "/users/list",
};

// TO REPLACE WITH ENV VARIABLE
export const CHATWOOT_TOKEN = "85PBKcBEQUiTBni6TAJTz5CF";
export const DOCS_URL = "https://www.useboomerang.io/docs";
export const SUPPORT_EMAIL = "hello@flowabl.io";
export const PROD_URL = "https://flowabl.io";
export const DEV_URL = "http://localhost:3000";

export const Tiers: Record<string, Tier> = {
  Free: "free",
  Starter: "starter",
  Maker: "maker",
  Premium: "premium",
};
