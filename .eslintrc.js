"use strict";

module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:eslint-plugin/recommended",
    "plugin:node/recommended"
  ],
  plugins: ["rong"],
  env: {
    node: true,
  },
  overrides: [
    {
      files: ["tests/**/*.js"],
      env: { mocha: true },
    },
  ],
  rules: {
    "no-console": 2,
    "rong/todo-supervise": [2, true, { warnLine: 10}]
  }
};
