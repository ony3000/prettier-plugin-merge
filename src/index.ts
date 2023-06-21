import type { Plugin } from 'prettier';

import { parsers } from './parsers';
import { printers } from './printers';

const mergePlugin: Plugin = {
  parsers,
  printers,
};

export default mergePlugin;
