import SortImportsPlugin from '@trivago/prettier-plugin-sort-imports';
import { format } from 'prettier';
import BraceStylePlugin from 'prettier-plugin-brace-style';
import {
  parsers as tailwindcssParsers,
  printers as tailwindcssPrinters,
  options as tailwindcssOptions, // @ts-ignore
} from 'prettier-plugin-tailwindcss';

import mergePlugin from '@/index';

import { tsxCounterComponentCode } from '../../fixtures';
import { baseOptions } from '../settings';
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

describe('[typescript] multiple plugin', () => {
  describe('Plugins that do not implement printers have no order constraints.', () => {
    test('[sort-imports -> tailwindcss]', () => {
      const options = {
        ...baseOptions,
        plugins: [SortImportsPlugin, TailwindcssPlugin, mergePlugin],
        importOrder: ['<THIRD_PARTY_MODULES>', '^@[^/]+/(.*)$', '^@/(.*)$', '^[./]'],
        importOrderSeparation: true,
      };

      expect(format(tsxCounterComponentCode, options)).toBe(sortImportsAndTailwindcssResult);
    });

    test('[tailwindcss -> sort-imports]', () => {
      const options = {
        ...baseOptions,
        plugins: [TailwindcssPlugin, SortImportsPlugin, mergePlugin],
        importOrder: ['<THIRD_PARTY_MODULES>', '^@[^/]+/(.*)$', '^@/(.*)$', '^[./]'],
        importOrderSeparation: true,
      };

      expect(format(tsxCounterComponentCode, options)).toBe(tailwindcssAndSortImportsResult);
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

      expect(format(tsxCounterComponentCode, options)).toBe(sortImportsAndBraceStyleResult);
    });

    test('[brace-style -> sort-imports]: [brace-style] is ignored.', () => {
      const options = {
        ...baseOptions,
        plugins: [BraceStylePlugin, SortImportsPlugin, mergePlugin],
        braceStyle: 'allman',
        importOrder: ['<THIRD_PARTY_MODULES>', '^@[^/]+/(.*)$', '^@/(.*)$', '^[./]'],
        importOrderSeparation: true,
      };

      expect(format(tsxCounterComponentCode, options)).toBe(braceStyleAndSortImportsResult);
    });

    test('[tailwindcss -> brace-style]', () => {
      const options = {
        ...baseOptions,
        plugins: [TailwindcssPlugin, BraceStylePlugin, mergePlugin],
        braceStyle: 'allman',
      };

      expect(format(tsxCounterComponentCode, options)).toBe(tailwindcssAndBraceStyleResult);
    });

    test('[brace-style -> tailwindcss]: [brace-style] is ignored.', () => {
      const options = {
        ...baseOptions,
        plugins: [BraceStylePlugin, TailwindcssPlugin, mergePlugin],
        braceStyle: 'allman',
      };

      expect(format(tsxCounterComponentCode, options)).toBe(braceStyleAndTailwindcssResult);
    });
  });
});
