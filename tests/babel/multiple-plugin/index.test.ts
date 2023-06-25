import SortImportsPlugin from '@trivago/prettier-plugin-sort-imports';
import type { Options } from 'prettier';
import { format } from 'prettier';
import BraceStylePlugin from 'prettier-plugin-brace-style';
import {
  parsers as tailwindcssParsers,
  printers as tailwindcssPrinters,
  options as tailwindcssOptions, // @ts-ignore
} from 'prettier-plugin-tailwindcss';

import mergePlugin from '@/index';

import { jsxCounterComponentCode } from '../../fixtures';
import {
  sortImportsAndTailwindcssResult,
  sortImportsAndBraceStyleResult,
  tailwindcssAndSortImportsResult,
  tailwindcssAndBraceStyleResult,
  braceStyleAndSortImportsResult,
  braceStyleAndTailwindcssResult,
} from './expected-results';

const TailwindcssPlugin = {
  parsers: tailwindcssParsers,
  printers: tailwindcssPrinters,
  options: tailwindcssOptions,
};

const baseOptions: Options = {
  parser: 'babel',
};

describe('[babel] multiple plugin', () => {
  describe('Plugins that do not implement printers have no order constraints.', () => {
    test('[sort-imports -> tailwindcss]', () => {
      const options = {
        ...baseOptions,
        plugins: [SortImportsPlugin, TailwindcssPlugin, mergePlugin],
        importOrder: ['<THIRD_PARTY_MODULES>', '^@[^/]+/(.*)$', '^@/(.*)$', '^[./]'],
        importOrderSeparation: true,
      };

      expect(format(jsxCounterComponentCode, options)).toBe(sortImportsAndTailwindcssResult);
    });

    test('[tailwindcss -> sort-imports]', () => {
      const options = {
        ...baseOptions,
        plugins: [TailwindcssPlugin, SortImportsPlugin, mergePlugin],
        importOrder: ['<THIRD_PARTY_MODULES>', '^@[^/]+/(.*)$', '^@/(.*)$', '^[./]'],
        importOrderSeparation: true,
      };

      expect(format(jsxCounterComponentCode, options)).toBe(tailwindcssAndSortImportsResult);
    });
  });

  describe('The plugin implementing the printer ([brace-style] in this case) may be ignored unless placed immediately before this plugin.', () => {
    test('[sort-imports -> brace-style]', () => {
      const options = {
        ...baseOptions,
        plugins: [SortImportsPlugin, BraceStylePlugin, mergePlugin],
        importOrder: ['<THIRD_PARTY_MODULES>', '^@[^/]+/(.*)$', '^@/(.*)$', '^[./]'],
        importOrderSeparation: true,
        braceStyle: 'allman',
      };

      expect(format(jsxCounterComponentCode, options)).toBe(sortImportsAndBraceStyleResult);
    });

    test('[brace-style -> sort-imports]: [brace-style] is ignored.', () => {
      const options = {
        ...baseOptions,
        plugins: [BraceStylePlugin, SortImportsPlugin, mergePlugin],
        braceStyle: 'allman',
        importOrder: ['<THIRD_PARTY_MODULES>', '^@[^/]+/(.*)$', '^@/(.*)$', '^[./]'],
        importOrderSeparation: true,
      };

      expect(format(jsxCounterComponentCode, options)).toBe(braceStyleAndSortImportsResult);
    });

    test('[tailwindcss -> brace-style]', () => {
      const options = {
        ...baseOptions,
        plugins: [TailwindcssPlugin, BraceStylePlugin, mergePlugin],
        braceStyle: 'allman',
      };

      expect(format(jsxCounterComponentCode, options)).toBe(tailwindcssAndBraceStyleResult);
    });

    test('[brace-style -> tailwindcss]: [brace-style] is ignored.', () => {
      const options = {
        ...baseOptions,
        plugins: [BraceStylePlugin, TailwindcssPlugin, mergePlugin],
        braceStyle: 'allman',
      };

      expect(format(jsxCounterComponentCode, options)).toBe(braceStyleAndTailwindcssResult);
    });
  });
});
