const baseConfig = require("prettier-config/base");

module.exports = {
  ...baseConfig,

  // plugins and plugin options
  plugins: [],
  overrides: [
    {
      files: ["babel/**", "typescript/**"],
      options: {
        plugins: [
          "@trivago/prettier-plugin-sort-imports",
          "prettier-plugin-tailwindcss",
          "prettier-plugin-classnames",
          "prettier-plugin-brace-style",
          "prettier-plugin-merge",
        ],
      },
    },
  ],
};
