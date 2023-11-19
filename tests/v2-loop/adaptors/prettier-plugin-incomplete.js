const mergePlugin = require("prettier-plugin-merge");

const incompleteMergePlugin = {
  parsers: {
    ...mergePlugin.parsers,
  },
};

module.exports = incompleteMergePlugin;
