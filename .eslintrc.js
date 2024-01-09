module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  env: {
    jest: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "prettier",
  ],
  parserOptions: {
    project: "packages/*/tsconfig.json",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  rules: {
    "@typescript-eslint/require-await": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
    ],
    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/no-empty-interface": "off",
    "no-constant-condition": ["error", { checkLoops: false }],
    "@typescript-eslint/no-empty-function": "off",
    // TODO: エラーにする
    "@typescript-eslint/no-unsafe-return": "warn",
    "@typescript-eslint/no-unsafe-member-access": "warn",
    "@typescript-eslint/no-unsafe-assignment": "warn",
    "@typescript-eslint/no-unsafe-call": "warn",
    "@typescript-eslint/restrict-plus-operands": "warn",
    "@typescript-eslint/no-unsafe-argument": "warn",
    "import/no-unresolved": ["error", { ignore: ["^virtual:"] }],
  },
};
