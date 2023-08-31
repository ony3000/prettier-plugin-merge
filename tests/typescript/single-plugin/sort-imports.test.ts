import type { Options } from 'prettier';

import mergePlugin from '@/index';

import { format, sortImportsPlugin } from '../../settings';
import { counterComponentCode, nextEnvDTSCode, nextAPIRouteCode } from '../fixtures';
import {
  sortImportsPluginResult,
  nextEnvDTSCodeResult,
  nextAPIRouteCodeResultWithoutBraceStylePlugin,
} from './expected-results';

const baseOptions: Options = {
  parser: 'typescript',
};

describe('[typescript] @trivago/prettier-plugin-sort-imports', () => {
  describe('Counter Component', () => {
    test('Standalone use without merge plugin', () => {
      const options = {
        ...baseOptions,
        plugins: [sortImportsPlugin],
        importOrder: ['<THIRD_PARTY_MODULES>', '^@[^/]+/(.*)$', '^@/(.*)$', '^[./]'],
        importOrderSeparation: true,
      };

      expect(format(counterComponentCode, options)).toBe(sortImportsPluginResult);
    });

    test('A combination of a single plugin and a merge plugin also has no effect', () => {
      const options = {
        ...baseOptions,
        plugins: [sortImportsPlugin, mergePlugin],
        importOrder: ['<THIRD_PARTY_MODULES>', '^@[^/]+/(.*)$', '^@/(.*)$', '^[./]'],
        importOrderSeparation: true,
      };

      expect(format(counterComponentCode, options)).toBe(sortImportsPluginResult);
    });
  });

  describe('next-env.d.ts', () => {
    test('Standalone use without merge plugin', () => {
      const options = {
        ...baseOptions,
        plugins: [sortImportsPlugin],
        importOrder: ['<THIRD_PARTY_MODULES>', '^@[^/]+/(.*)$', '^@/(.*)$', '^[./]'],
        importOrderSeparation: true,
      };

      expect(format(nextEnvDTSCode, options)).toBe(nextEnvDTSCodeResult);
    });

    test('A combination of a single plugin and a merge plugin also has no effect', () => {
      const options = {
        ...baseOptions,
        plugins: [sortImportsPlugin, mergePlugin],
        importOrder: ['<THIRD_PARTY_MODULES>', '^@[^/]+/(.*)$', '^@/(.*)$', '^[./]'],
        importOrderSeparation: true,
      };

      expect(format(nextEnvDTSCode, options)).toBe(nextEnvDTSCodeResult);
    });
  });

  describe('Next.js API route', () => {
    test('Standalone use without merge plugin', () => {
      const options = {
        ...baseOptions,
        plugins: [sortImportsPlugin],
        importOrder: ['<THIRD_PARTY_MODULES>', '^@[^/]+/(.*)$', '^@/(.*)$', '^[./]'],
        importOrderSeparation: true,
      };

      expect(format(nextAPIRouteCode, options)).toBe(nextAPIRouteCodeResultWithoutBraceStylePlugin);
    });

    test('A combination of a single plugin and a merge plugin also has no effect', () => {
      const options = {
        ...baseOptions,
        plugins: [sortImportsPlugin, mergePlugin],
        importOrder: ['<THIRD_PARTY_MODULES>', '^@[^/]+/(.*)$', '^@/(.*)$', '^[./]'],
        importOrderSeparation: true,
      };

      expect(format(nextAPIRouteCode, options)).toBe(nextAPIRouteCodeResultWithoutBraceStylePlugin);
    });
  });
});
