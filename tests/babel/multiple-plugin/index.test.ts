import type { Options } from 'prettier';

import mergePlugin from '@/index';

import { format, sortImportsPlugin, tailwindcssPlugin, braceStylePlugin } from '../../settings';
import { counterComponentCode } from '../fixtures';
import {
  sortImportsAndTailwindcssResult,
  sortImportsAndBraceStyleResult,
  tailwindcssAndSortImportsResult,
  tailwindcssAndBraceStyleResult,
  braceStyleAndSortImportsResult,
  braceStyleAndTailwindcssResult,
} from './expected-results';

const baseOptions: Options = {
  parser: 'babel',
};

describe('[babel] multiple plugin', () => {
  describe('Plugins that do not implement printers have no order constraints.', () => {
    test('[sort-imports -> tailwindcss]', () => {
      const options = {
        ...baseOptions,
        plugins: [sortImportsPlugin, tailwindcssPlugin, mergePlugin],
        importOrder: ['<THIRD_PARTY_MODULES>', '^@[^/]+/(.*)$', '^@/(.*)$', '^[./]'],
        importOrderSeparation: true,
      };

      expect(format(counterComponentCode, options)).toBe(sortImportsAndTailwindcssResult);
    });

    test('[tailwindcss -> sort-imports]', () => {
      const options = {
        ...baseOptions,
        plugins: [tailwindcssPlugin, sortImportsPlugin, mergePlugin],
        importOrder: ['<THIRD_PARTY_MODULES>', '^@[^/]+/(.*)$', '^@/(.*)$', '^[./]'],
        importOrderSeparation: true,
      };

      expect(format(counterComponentCode, options)).toBe(tailwindcssAndSortImportsResult);
    });
  });

  describe('The plugin implementing the printer ([brace-style] in this case) may be ignored unless placed immediately before this plugin.', () => {
    test('[sort-imports -> brace-style]', () => {
      const options = {
        ...baseOptions,
        plugins: [sortImportsPlugin, braceStylePlugin, mergePlugin],
        importOrder: ['<THIRD_PARTY_MODULES>', '^@[^/]+/(.*)$', '^@/(.*)$', '^[./]'],
        importOrderSeparation: true,
        braceStyle: 'allman',
      };

      expect(format(counterComponentCode, options)).toBe(sortImportsAndBraceStyleResult);
    });

    test('[brace-style -> sort-imports]: [brace-style] is ignored.', () => {
      const options = {
        ...baseOptions,
        plugins: [braceStylePlugin, sortImportsPlugin, mergePlugin],
        braceStyle: 'allman',
        importOrder: ['<THIRD_PARTY_MODULES>', '^@[^/]+/(.*)$', '^@/(.*)$', '^[./]'],
        importOrderSeparation: true,
      };

      expect(format(counterComponentCode, options)).toBe(braceStyleAndSortImportsResult);
    });

    test('[tailwindcss -> brace-style]', () => {
      const options = {
        ...baseOptions,
        plugins: [tailwindcssPlugin, braceStylePlugin, mergePlugin],
        braceStyle: 'allman',
      };

      expect(format(counterComponentCode, options)).toBe(tailwindcssAndBraceStyleResult);
    });

    test('[brace-style -> tailwindcss]: [brace-style] is ignored.', () => {
      const options = {
        ...baseOptions,
        plugins: [braceStylePlugin, tailwindcssPlugin, mergePlugin],
        braceStyle: 'allman',
      };

      expect(format(counterComponentCode, options)).toBe(braceStyleAndTailwindcssResult);
    });
  });
});
