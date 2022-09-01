module.exports = {
  env: {
    browser: true,
  },
  extends: ["plugin:react/recommended"],
  rules: {
    "react/prop-types": "off",
    // TODO: errorにする
    "@typescript-eslint/no-floating-promises": "warn",
    "@typescript-eslint/no-misused-promises": "warn",
    "react/display-name": "warn",

  },
  settings: {
    react: {
      createClass: "createReactClass",
      pragma: "React",
      version: "16.8",
    },
  },
};
