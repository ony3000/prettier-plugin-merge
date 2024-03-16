const mergePlugin = require("bundle-entry");

const incompleteMergePlugin = {
  parsers: {
    ...mergePlugin.parsers,
  },
};

module.exports = incompleteMergePlugin;
