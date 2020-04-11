module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  env: {
    browser: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:prettier/recommended",
    "prettier",
    "prettier/@typescript-eslint",
    "prettier/react",
  ],
  parserOptions: {
    project: "tsconfig.json",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  rules: {
    "@typescript-eslint/array-type": [
      "error",
      {
        default: "generic",
      },
    ],
    "@typescript-eslint/await-thenable": "error",
    // "@typescript-eslint/return-await": ["error", "always"], // なんかasync関数じゃないのにfixしたらawaitつけてくる…
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-empty-interface": "off",
    "@typescript-eslint/no-floating-promises": "warn", // そのうちエラーにしたい(Reactのコールバック的に今は無理)
    "@typescript-eslint/prefer-for-of": "error",
    "@typescript-eslint/prefer-function-type": "error",
    complexity: "warn", // 便利そう
    "dot-notation": "error",
    eqeqeq: ["error"],
    "guard-for-in": "error",
    "new-parens": "error",
    "no-bitwise": "error",
    "no-caller": "error",
    "no-console": "warn", // そのうち
    "no-fallthrough": "error",
    "no-new-wrappers": "error",
    "no-shadow": [
      "error",
      {
        builtinGlobals: false, // そのうち
        hoist: "all",
      },
    ],
    "no-underscore-dangle": [
      "error",
      {
        allow: [
          "__typename",
          "__ENV__",
          "__RAW_ENV__",
          "__BUILD_DATE__",
          "__MODE__",
          "__ENABLE_BFF__",
        ],
      },
    ],
    "no-unsafe-finally": "error",
    "no-unused-expressions": "error",
    "no-var": "error",
    "prefer-const": "error",
    // strict-type-predicates入れたい: https://github.com/typescript-eslint/typescript-eslint/pull/738
    "react/jsx-boolean-value": ["error", "always"],
    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    // unused-importがほしい: https://github.com/typescript-eslint/typescript-eslint/issues/371
    "react/display-name": "warn",
    "@typescript-eslint/no-use-before-define": [
      "error",
      {
        functions: false,
      },
    ],
    "@typescript-eslint/require-await": "warn",
  },
  settings: {
    react: {
      createClass: "createReactClass",
      pragma: "React",
      version: "detect",
    },
  },
};
