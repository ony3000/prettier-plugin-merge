import type { Options } from 'prettier';

import mergePlugin from '@/index';

import { format, tailwindcssPlugin } from '../../settings';
import { counterComponentCode, jestConfigCode, jestSetupCode, nextConfigCode } from '../fixtures';
import {
  tailwindcssPluginResult,
  jestConfigCodeResult,
  jestSetupCodeResultWithoutSortImportsPlugin,
  nextConfigCodeResult,
} from './expected-results';

const baseOptions: Options = {
  parser: 'babel',
};

describe('[babel] prettier-plugin-tailwindcss', () => {
  describe('Counter Component', () => {
    test('Standalone use without merge plugin', () => {
      const options = {
        ...baseOptions,
        plugins: [tailwindcssPlugin],
      };

      expect(format(counterComponentCode, options)).toBe(tailwindcssPluginResult);
    });

    test('A combination of a single plugin and a merge plugin also has no effect', () => {
      const options = {
        ...baseOptions,
        plugins: [tailwindcssPlugin, mergePlugin],
      };

      expect(format(counterComponentCode, options)).toBe(tailwindcssPluginResult);
    });
  });

  describe('jest.config.js', () => {
    test('Standalone use without merge plugin', () => {
      const options = {
        ...baseOptions,
        plugins: [tailwindcssPlugin],
      };

      expect(format(jestConfigCode, options)).toBe(jestConfigCodeResult);
    });

    test('A combination of a single plugin and a merge plugin also has no effect', () => {
      const options = {
        ...baseOptions,
        plugins: [tailwindcssPlugin, mergePlugin],
      };

      expect(format(jestConfigCode, options)).toBe(jestConfigCodeResult);
    });
  });

  describe('jest.setup.js', () => {
    test('Standalone use without merge plugin', () => {
      const options = {
        ...baseOptions,
        plugins: [tailwindcssPlugin],
      };

      expect(format(jestSetupCode, options)).toBe(jestSetupCodeResultWithoutSortImportsPlugin);
    });

    test('A combination of a single plugin and a merge plugin also has no effect', () => {
      const options = {
        ...baseOptions,
        plugins: [tailwindcssPlugin, mergePlugin],
      };

      expect(format(jestSetupCode, options)).toBe(jestSetupCodeResultWithoutSortImportsPlugin);
    });
  });

  describe('next.config.js', () => {
    test('Standalone use without merge plugin', () => {
      const options = {
        ...baseOptions,
        plugins: [tailwindcssPlugin],
      };

      expect(format(nextConfigCode, options)).toBe(nextConfigCodeResult);
    });

    test('A combination of a single plugin and a merge plugin also has no effect', () => {
      const options = {
        ...baseOptions,
        plugins: [tailwindcssPlugin, mergePlugin],
      };

      expect(format(nextConfigCode, options)).toBe(nextConfigCodeResult);
    });
  });
});
