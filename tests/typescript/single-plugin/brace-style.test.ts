import type { Options } from 'prettier';

import mergePlugin from '@/index';

import { format, BraceStylePlugin } from '../../settings';
import { counterComponentCode } from '../fixtures';
import { braceStylePluginResult } from './expected-results';

const baseOptions: Options = {
  parser: 'typescript',
};

describe('[typescript] prettier-plugin-brace-style', () => {
  test('Standalone use without merge plugin', () => {
    const options = {
      ...baseOptions,
      plugins: [BraceStylePlugin],
      braceStyle: 'allman',
    };

    expect(format(counterComponentCode, options)).toBe(braceStylePluginResult);
  });

  test('A combination of a single plugin and a merge plugin also has no effect', () => {
    const options = {
      ...baseOptions,
      plugins: [BraceStylePlugin, mergePlugin],
      braceStyle: 'allman',
    };

    expect(format(counterComponentCode, options)).toBe(braceStylePluginResult);
  });
});
