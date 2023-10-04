const baseConfig = require("prettier-config/base");

module.exports = {
  ...baseConfig,

  // plugins and plugin options
  plugins: ["prettier-plugin-tailwindcss", "bundle-entry"],
};
