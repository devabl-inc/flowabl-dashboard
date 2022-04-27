declare global {
  interface Window {
    _SERVER_DATA: {
      APP_ROOT: string;
      PRODUCT_ENV_URL: string;
      PRODUCT_SERVICE_ENV_URL: string;
      [key: string]: string;
    };
    $crisp: { push: (args: Array<string>) => void };
  }
}

export interface FlowablSubscription {
  price: number;
  product: Tier;
  interval: string;
  name: string;
}

export type Tier = "explorer" | "starter" | "maker" | "premium";
