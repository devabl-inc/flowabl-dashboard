//@ts-nocheck
import axios, { CancelToken } from "axios";
// import portForwardMap from "../setupPortForwarding";
// const REACT_APP_PORT_FORWARD = process.env.REACT_APP_PORT_FORWARD;

/**
 * if port forwarding is enabled, then check to see if service is in config map
 * If it is, set the url request to be only the serviceContextPath
 * CRA will proxy the request as seen in setupProxy.js
 * @param {string} baseUrl - base of the serivce url
 * @param {sring} serviceContextPath - additional path for the service context e.g. /admin
 */
// function determineUrl(baseUrl, serviceContextPath) {
//   if (REACT_APP_PORT_FORWARD && portForwardMap[serviceContextPath]) {
//     return serviceContextPath;
//   } else {
//     return baseUrl + serviceContextPath;
//   }
// }

/**
 * Used for communicating with the CORE services
 * This value is passed into the container at run time by the helm chart
 * and added to the window as a global variable by the @boomerang/boomerang-webapp-server
 */
export const BASE_SERVICE_ENV_URL =
  process.env.NODE_ENV === "production" ? window._SERVER_DATA && window._SERVER_DATA.BASE_SERVICE_ENV_URL : "/api";

/**
 * Used for communicating with the main product services for this application
 * This value is passed into the container at run time by the helm chart
 * and added to the window as a global variable by the @boomerang/boomerang-webapp-server
 */
export const PRODUCT_SERVICE_ENV_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8000/api"
    : (window._SERVER_DATA && window._SERVER_DATA?.PRODUCT_SERVICE_ENV_URL) ?? "/";

export const BASE_URL = BASE_SERVICE_ENV_URL;

export const serviceUrl = {
  resourceFeatures: () => `${BASE_URL}/features`,
  resourceNavigation: () => `${BASE_URL}/navigation`,
  resourceUserProfile: () => `${BASE_URL}/profile`,
};

export const cancellableResolver = ({ url, method, body, ...config }) => {
  // Create a new CancelToken source for this request
  const source = CancelToken.source();
  const promise = axios({
    ...config,
    method,
    url,
    data: body,
    cancelToken: source.token,
  });
  return { promise, cancel: () => source.cancel("cancel") };
};

export const resolver = {
  query: (url) => () => axios.get(url).then((response) => response.data),
  postMutation: (request) => axios.post(request),
  postCreateBug: (request) => axios.post(serviceUrl.resourceFeatures(), request),
  patchMutation: (request) => axios.patch(request),
  putMutation: (request) => axios.put(request),
};
