import { Tier, FlowablSubscription, SubscriptionInterval } from "Utils/types";
/**
 * Used for setting up the root context that the application is server on
 * This allows the app to be easily deployed out to multiple environments without recompiling
 * This value is passed into the container at run time by the helm chart
 * and added to the window as a global variable by the @boomerang/boomerang-webapp-server
 */
export const APP_ROOT =
  window._SERVER_DATA && window._SERVER_DATA.APP_ROOT !== undefined ? window._SERVER_DATA.APP_ROOT : "/";

export const isDevEnv = process.env.NODE_ENV === "development";
export const isTestEnv = process.env.NODE_ENV === "test";
export const isProdEnv = process.env.NODE_ENV === "production";

export const AppPath = {
  Root: "/",
  Profile: "/profile",
  Subscription: "/subscription",
  Support: "/support",
  Logout: "/logout",
  Login: "/login",
  Signup: "/signup",
};

export const AppLink = {
  Root: () => "/",
  Login: () => "/login",
  Signup: () => "/signup",
  Subscription: () => "/subscription",
  Users: () => "/users",
  UsersCurrent: () => "/users/current",
  UsersList: () => "/users/list",
};

// TO REPLACE WITH ENV VARIABLE
export const MARKETING_URL = "https://flowabl.io";
export const APP_URL = "https://app.flowabl.io/apps/flow/workflows";
export const OSS_URL = "https://useboomerang.io/flow";
export const DOCS_URL = "https://www.useboomerang.io/docs/boomerang-flow/introduction/overview";
export const SUPPORT_EMAIL = "hello@flowabl.io";
export const DEV_URL = "http://localhost:3000";

export const Tiers: Record<string, Tier> = {
  Explorer: "explorer",
  Starter: "starter",
  Maker: "maker",
  Scaler: "scaler",
};

export const SubscriptionConfigs: Record<Tier, FlowablSubscription> = {
  explorer: {
    name: "",
    product: Tiers.Explorer,
    price: 0,
    interval: "month",
  },
  starter: { name: "Starter", product: Tiers.Starter, price: 0, interval: "month" },
  maker: { name: "Maker", product: Tiers.Maker, price: 0, interval: "month" },
  scaler: { name: "Scaler", product: Tiers.Scaler, price: 0, interval: "month" },
};
