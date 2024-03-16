// eslint-disable-next-line import/no-import-module-exports
import prettier from 'prettier';

if (prettier.version.startsWith('2.')) {
  // eslint-disable-next-line global-require
  module.exports = require('v2-plugin');
} else {
  // TODO: implement v3 plugin
  // eslint-disable-next-line global-require
  module.exports = require('v2-plugin');
}
