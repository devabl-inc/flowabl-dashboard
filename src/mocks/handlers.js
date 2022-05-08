import { rest } from "msw";
import { serviceUrl } from "Config/servicesConfig";
import { userProfile, navigation } from "../mocks/fixtures";

export const handlers = [
  rest.get(serviceUrl.resourceNavigation(), (req, res, ctx) => {
    // Persist user's authentication in the session
    return res(
      // Respond with a 200 status code
      ctx.status(200),
      ctx.json(navigation)
    );
  }),
  rest.get(serviceUrl.resourceUserProfile(), (req, res, ctx) => {
    // Check if the user is authenticated in this session
    // If authenticated, return a mocked user details
    return res(ctx.status(200), ctx.json(userProfile));
  }),

  rest.post(serviceUrl.resourceFeatures(), (req, res, ctx) => {
    // Check if the user is authenticated in this session
    // If authenticated, return a mocked user details
    return res(ctx.status(200), ctx.json({ status: "good job!" }));
  }),

  rest.post(serviceUrl.resourceSubscription(), (req, res, ctx) => {
    // Check if the user is authenticated in this session
    // If authenticated, return a mocked user details
    return res(ctx.status(200), ctx.json({ status: "good job!" }));
  }),
];
