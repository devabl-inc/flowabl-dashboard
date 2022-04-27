module.exports = {
  extends: [
    "plugin:jest/recommended",
    "plugin:jest-dom/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:testing-library/react",
  ],
  plugins: ["jest", "jest-dom", "jsx-a11y", "react-hooks", "testing-library"],
  env: {
    "jest/globals": true,
  },
  globals: {
    ibmStats: true,
    render: true,
    rtlRender: true,
    rtlRouterRender: true,
    rtlContextRouterRender: true,
  },
  ignorePatterns: ["public/*", "cypress/*"],
};
