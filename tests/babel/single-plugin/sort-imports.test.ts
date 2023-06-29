import type { Options } from 'prettier';

import mergePlugin from '@/index';

import { format, SortImportsPlugin } from '../../settings';
import { counterComponentCode } from '../fixtures';
import { sortImportsPluginResult } from './expected-results';

const baseOptions: Options = {
  parser: 'babel',
};

describe('[babel] @trivago/prettier-plugin-sort-imports', () => {
  test('Standalone use without merge plugin', () => {
    const options = {
      ...baseOptions,
      plugins: [SortImportsPlugin],
      importOrder: ['<THIRD_PARTY_MODULES>', '^@[^/]+/(.*)$', '^@/(.*)$', '^[./]'],
      importOrderSeparation: true,
    };

    expect(format(counterComponentCode, options)).toBe(sortImportsPluginResult);
  });

  test('A combination of a single plugin and a merge plugin also has no effect', () => {
    const options = {
      ...baseOptions,
      plugins: [SortImportsPlugin, mergePlugin],
      importOrder: ['<THIRD_PARTY_MODULES>', '^@[^/]+/(.*)$', '^@/(.*)$', '^[./]'],
      importOrderSeparation: true,
    };

    expect(format(counterComponentCode, options)).toBe(sortImportsPluginResult);
  });
});
