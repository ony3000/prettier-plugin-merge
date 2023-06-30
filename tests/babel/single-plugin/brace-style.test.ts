import type { Options } from 'prettier';

import mergePlugin from '@/index';

import { format, BraceStylePlugin } from '../../settings';
import { counterComponentCode, jestConfigCode, jestSetupCode, nextConfigCode } from '../fixtures';
import {
  braceStylePluginResult,
  jestConfigCodeResult,
  jestSetupCodeResultWithoutSortImportsPlugin,
  nextConfigCodeResult,
} from './expected-results';

const baseOptions: Options = {
  parser: 'babel',
};

describe('[babel] prettier-plugin-brace-style', () => {
  describe('Counter Component', () => {
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

  describe('jest.config.js', () => {
    test('Standalone use without merge plugin', () => {
      const options = {
        ...baseOptions,
        plugins: [BraceStylePlugin],
        braceStyle: 'allman',
      };

      expect(format(jestConfigCode, options)).toBe(jestConfigCodeResult);
    });

    test('A combination of a single plugin and a merge plugin also has no effect', () => {
      const options = {
        ...baseOptions,
        plugins: [BraceStylePlugin, mergePlugin],
        braceStyle: 'allman',
      };

      expect(format(jestConfigCode, options)).toBe(jestConfigCodeResult);
    });
  });

  describe('jest.setup.js', () => {
    test('Standalone use without merge plugin', () => {
      const options = {
        ...baseOptions,
        plugins: [BraceStylePlugin],
        braceStyle: 'allman',
      };

      expect(format(jestSetupCode, options)).toBe(jestSetupCodeResultWithoutSortImportsPlugin);
    });

    test('A combination of a single plugin and a merge plugin also has no effect', () => {
      const options = {
        ...baseOptions,
        plugins: [BraceStylePlugin, mergePlugin],
        braceStyle: 'allman',
      };

      expect(format(jestSetupCode, options)).toBe(jestSetupCodeResultWithoutSortImportsPlugin);
    });
  });

  describe('next.config.js', () => {
    test('Standalone use without merge plugin', () => {
      const options = {
        ...baseOptions,
        plugins: [BraceStylePlugin],
        braceStyle: 'allman',
      };

      expect(format(nextConfigCode, options)).toBe(nextConfigCodeResult);
    });

    test('A combination of a single plugin and a merge plugin also has no effect', () => {
      const options = {
        ...baseOptions,
        plugins: [BraceStylePlugin, mergePlugin],
        braceStyle: 'allman',
      };

      expect(format(nextConfigCode, options)).toBe(nextConfigCodeResult);
    });
  });
});
