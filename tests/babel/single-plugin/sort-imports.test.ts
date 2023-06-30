import type { Options } from 'prettier';

import mergePlugin from '@/index';

import { format, SortImportsPlugin } from '../../settings';
import { counterComponentCode, jestConfigCode, jestSetupCode, nextConfigCode } from '../fixtures';
import {
  sortImportsPluginResult,
  jestConfigCodeResult,
  jestSetupCodeResultWithSortImportsPlugin,
  nextConfigCodeResult,
} from './expected-results';

const baseOptions: Options = {
  parser: 'babel',
};

describe('[babel] @trivago/prettier-plugin-sort-imports', () => {
  describe('Counter Component', () => {
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

  describe('jest.config.js', () => {
    test('Standalone use without merge plugin', () => {
      const options = {
        ...baseOptions,
        plugins: [SortImportsPlugin],
        importOrder: ['<THIRD_PARTY_MODULES>', '^@[^/]+/(.*)$', '^@/(.*)$', '^[./]'],
        importOrderSeparation: true,
      };

      expect(format(jestConfigCode, options)).toBe(jestConfigCodeResult);
    });

    test('A combination of a single plugin and a merge plugin also has no effect', () => {
      const options = {
        ...baseOptions,
        plugins: [SortImportsPlugin, mergePlugin],
        importOrder: ['<THIRD_PARTY_MODULES>', '^@[^/]+/(.*)$', '^@/(.*)$', '^[./]'],
        importOrderSeparation: true,
      };

      expect(format(jestConfigCode, options)).toBe(jestConfigCodeResult);
    });
  });

  describe('jest.setup.js', () => {
    test('Standalone use without merge plugin', () => {
      const options = {
        ...baseOptions,
        plugins: [SortImportsPlugin],
        importOrder: ['<THIRD_PARTY_MODULES>', '^@[^/]+/(.*)$', '^@/(.*)$', '^[./]'],
        importOrderSeparation: true,
      };

      expect(format(jestSetupCode, options)).toBe(jestSetupCodeResultWithSortImportsPlugin);
    });

    test('A combination of a single plugin and a merge plugin also has no effect', () => {
      const options = {
        ...baseOptions,
        plugins: [SortImportsPlugin, mergePlugin],
        importOrder: ['<THIRD_PARTY_MODULES>', '^@[^/]+/(.*)$', '^@/(.*)$', '^[./]'],
        importOrderSeparation: true,
      };

      expect(format(jestSetupCode, options)).toBe(jestSetupCodeResultWithSortImportsPlugin);
    });
  });

  describe('next.config.js', () => {
    test('Standalone use without merge plugin', () => {
      const options = {
        ...baseOptions,
        plugins: [SortImportsPlugin],
        importOrder: ['<THIRD_PARTY_MODULES>', '^@[^/]+/(.*)$', '^@/(.*)$', '^[./]'],
        importOrderSeparation: true,
      };

      expect(format(nextConfigCode, options)).toBe(nextConfigCodeResult);
    });

    test('A combination of a single plugin and a merge plugin also has no effect', () => {
      const options = {
        ...baseOptions,
        plugins: [SortImportsPlugin, mergePlugin],
        importOrder: ['<THIRD_PARTY_MODULES>', '^@[^/]+/(.*)$', '^@/(.*)$', '^[./]'],
        importOrderSeparation: true,
      };

      expect(format(nextConfigCode, options)).toBe(nextConfigCodeResult);
    });
  });
});
