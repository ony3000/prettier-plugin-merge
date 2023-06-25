import type { Options } from 'prettier';

import mergePlugin from '@/index';

import { format, SortImportsPlugin, TailwindcssPlugin, BraceStylePlugin } from '../../settings';
import { counterComponentCode } from '../fixtures';
import {
  sortImportsPluginResult,
  tailwindcssPluginResult,
  braceStylePluginResult,
} from './expected-results';

const baseOptions: Options = {
  parser: 'typescript',
};

describe('[typescript] single plugin', () => {
  test('@trivago/prettier-plugin-sort-imports', () => {
    const options = {
      ...baseOptions,
      plugins: [SortImportsPlugin],
      importOrder: ['<THIRD_PARTY_MODULES>', '^@[^/]+/(.*)$', '^@/(.*)$', '^[./]'],
      importOrderSeparation: true,
    };

    expect(format(counterComponentCode, options)).toBe(sortImportsPluginResult);
  });

  test('[sort-imports] A combination of a single plugin and a merge plugin also has no effect', () => {
    const options = {
      ...baseOptions,
      plugins: [SortImportsPlugin, mergePlugin],
      importOrder: ['<THIRD_PARTY_MODULES>', '^@[^/]+/(.*)$', '^@/(.*)$', '^[./]'],
      importOrderSeparation: true,
    };

    expect(format(counterComponentCode, options)).toBe(sortImportsPluginResult);
  });

  test('prettier-plugin-tailwindcss', () => {
    const options = {
      ...baseOptions,
      plugins: [TailwindcssPlugin],
    };

    expect(format(counterComponentCode, options)).toBe(tailwindcssPluginResult);
  });

  test('[tailwindcss] A combination of a single plugin and a merge plugin also has no effect', () => {
    const options = {
      ...baseOptions,
      plugins: [TailwindcssPlugin, mergePlugin],
    };

    expect(format(counterComponentCode, options)).toBe(tailwindcssPluginResult);
  });

  test('prettier-plugin-brace-style', () => {
    const options = {
      ...baseOptions,
      plugins: [BraceStylePlugin],
      braceStyle: 'allman',
    };

    expect(format(counterComponentCode, options)).toBe(braceStylePluginResult);
  });

  test('[brace-style] A combination of a single plugin and a merge plugin also has no effect', () => {
    const options = {
      ...baseOptions,
      plugins: [BraceStylePlugin, mergePlugin],
      braceStyle: 'allman',
    };

    expect(format(counterComponentCode, options)).toBe(braceStylePluginResult);
  });
});
