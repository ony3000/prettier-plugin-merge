const mergePlugin = require("prettier-plugin-merge");

const decoratedMergePlugin = {
  ...mergePlugin,
  printers: {
    "merging-ast": {
      print: (...args) => {
        if (globalThis.callCount === undefined) {
          globalThis.callCount = 0;
        }

        globalThis.callCount += 1;

        if (globalThis.callCount > 10) {
          throw new Error(
            "Aborting formatting because it may have caused an infinite loop.",
          );
        }

        return mergePlugin.printers["merging-ast"].print(...args);
      },
    },
  },
};

module.exports = decoratedMergePlugin;
