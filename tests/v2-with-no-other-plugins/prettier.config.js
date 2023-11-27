const baseConfig = require("prettier-config/base");

module.exports = {
  ...baseConfig,

  // plugins and plugin options
  plugins: [],
  overrides: [
    {
      files: ["babel/**", "typescript/**", "vue/**"],
      options: {
        plugins: ["prettier-plugin-merge"],
      },
    },
  ],
};
