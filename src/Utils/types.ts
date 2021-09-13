declare global {
  interface Window {
    _SERVER_DATA: {
      APP_ROOT: string;
      BASE_LAUNCH_ENV_URL: string;
      PRODUCT_SERVICE_ENV_URL: string;
      [key: string]: string;
    };
    $chatwoot: { toggle: () => void };
  }
}

export interface User {
  name: string;
  email: string;
  created: string;
}

export interface FlowablSubscription {
  price: number;
  product: Tier;
  interval: string;
  name: string;
}

export type Tier = "free" | "starter" | "maker" | "premium";
