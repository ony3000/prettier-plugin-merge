import type { Options } from 'prettier';

import mergePlugin from '@/index';

import { format, TailwindcssPlugin } from '../../settings';
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
        plugins: [TailwindcssPlugin],
      };

      expect(format(counterComponentCode, options)).toBe(tailwindcssPluginResult);
    });

    test('A combination of a single plugin and a merge plugin also has no effect', () => {
      const options = {
        ...baseOptions,
        plugins: [TailwindcssPlugin, mergePlugin],
      };

      expect(format(counterComponentCode, options)).toBe(tailwindcssPluginResult);
    });
  });

  describe('jest.config.js', () => {
    test('Standalone use without merge plugin', () => {
      const options = {
        ...baseOptions,
        plugins: [TailwindcssPlugin],
      };

      expect(format(jestConfigCode, options)).toBe(jestConfigCodeResult);
    });

    test('A combination of a single plugin and a merge plugin also has no effect', () => {
      const options = {
        ...baseOptions,
        plugins: [TailwindcssPlugin, mergePlugin],
      };

      expect(format(jestConfigCode, options)).toBe(jestConfigCodeResult);
    });
  });

  describe('jest.setup.js', () => {
    test('Standalone use without merge plugin', () => {
      const options = {
        ...baseOptions,
        plugins: [TailwindcssPlugin],
      };

      expect(format(jestSetupCode, options)).toBe(jestSetupCodeResultWithoutSortImportsPlugin);
    });

    test('A combination of a single plugin and a merge plugin also has no effect', () => {
      const options = {
        ...baseOptions,
        plugins: [TailwindcssPlugin, mergePlugin],
      };

      expect(format(jestSetupCode, options)).toBe(jestSetupCodeResultWithoutSortImportsPlugin);
    });
  });

  describe('next.config.js', () => {
    test('Standalone use without merge plugin', () => {
      const options = {
        ...baseOptions,
        plugins: [TailwindcssPlugin],
      };

      expect(format(nextConfigCode, options)).toBe(nextConfigCodeResult);
    });

    test('A combination of a single plugin and a merge plugin also has no effect', () => {
      const options = {
        ...baseOptions,
        plugins: [TailwindcssPlugin, mergePlugin],
      };

      expect(format(nextConfigCode, options)).toBe(nextConfigCodeResult);
    });
  });
});
