import { format } from 'prettier';
import SortImportsPlugin from '@trivago/prettier-plugin-sort-imports';
import {
  parsers as tailwindcssParsers,
  printers as tailwindcssPrinters,
  options as tailwindcssOptions,
  // @ts-ignore
} from 'prettier-plugin-tailwindcss';
import BraceStylePlugin from 'prettier-plugin-brace-style';
import mergePlugin from '@/index';
import { baseOptions } from '../settings';
import { jsxCounterComponentCode } from '../../fixtures';
import {
  sortImportsPluginResult,
  tailwindcssPluginResult,
  braceStylePluginResult,
} from './expected-results';

const TailwindcssPlugin = {
  parsers: tailwindcssParsers,
  printers: tailwindcssPrinters,
  options: tailwindcssOptions,
};

describe('[babel] single plugin', () => {
  test('@trivago/prettier-plugin-sort-imports', () => {
    const options = {
      ...baseOptions,
      plugins: [SortImportsPlugin],
      importOrder: ['<THIRD_PARTY_MODULES>', '^@[^/]+/(.*)$', '^@/(.*)$', '^[./]'],
      importOrderSeparation: true,
    };

    expect(format(jsxCounterComponentCode, options)).toBe(sortImportsPluginResult);
  });

  test('[sort-imports] A combination of a single plugin and a merge plugin also has no effect', () => {
    const options = {
      ...baseOptions,
      plugins: [SortImportsPlugin, mergePlugin],
      importOrder: ['<THIRD_PARTY_MODULES>', '^@[^/]+/(.*)$', '^@/(.*)$', '^[./]'],
      importOrderSeparation: true,
    };

    expect(format(jsxCounterComponentCode, options)).toBe(sortImportsPluginResult);
  });

  test('prettier-plugin-tailwindcss', () => {
    const options = {
      ...baseOptions,
      plugins: [TailwindcssPlugin],
    };

    expect(format(jsxCounterComponentCode, options)).toBe(tailwindcssPluginResult);
  });

  test('[tailwindcss] A combination of a single plugin and a merge plugin also has no effect', () => {
    const options = {
      ...baseOptions,
      plugins: [TailwindcssPlugin, mergePlugin],
    };

    expect(format(jsxCounterComponentCode, options)).toBe(tailwindcssPluginResult);
  });

  test('prettier-plugin-brace-style', () => {
    const options = {
      ...baseOptions,
      plugins: [BraceStylePlugin],
      braceStyle: 'allman',
    };

    expect(format(jsxCounterComponentCode, options)).toBe(braceStylePluginResult);
  });

  test('[brace-style] A combination of a single plugin and a merge plugin also has no effect', () => {
    const options = {
      ...baseOptions,
      plugins: [BraceStylePlugin, mergePlugin],
      braceStyle: 'allman',
    };

    expect(format(jsxCounterComponentCode, options)).toBe(braceStylePluginResult);
  });
});
