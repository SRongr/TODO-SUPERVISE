"use strict";

module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:eslint-plugin/recommended",
    "plugin:node/recommended"
  ],
  plugins: ["todo-supervise"],
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
    "todo-supervise": 2
  }
};
