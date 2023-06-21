import type { Plugin } from 'prettier';

import { parsers } from './parsers';

const mergePlugin: Plugin = {
  parsers,
};

export default mergePlugin;
