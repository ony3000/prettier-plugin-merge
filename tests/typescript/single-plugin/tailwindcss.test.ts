import type { Options } from 'prettier';

import mergePlugin from '@/index';

import { format, TailwindcssPlugin } from '../../settings';
import { counterComponentCode, nextEnvDTSCode, nextAPIRouteCode } from '../fixtures';
import {
  tailwindcssPluginResult,
  nextEnvDTSCodeResult,
  nextAPIRouteCodeResultWithoutBraceStylePlugin,
} from './expected-results';

const baseOptions: Options = {
  parser: 'typescript',
};

describe('[typescript] prettier-plugin-tailwindcss', () => {
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

  describe('next-env.d.ts', () => {
    test('Standalone use without merge plugin', () => {
      const options = {
        ...baseOptions,
        plugins: [TailwindcssPlugin],
      };

      expect(format(nextEnvDTSCode, options)).toBe(nextEnvDTSCodeResult);
    });

    test('A combination of a single plugin and a merge plugin also has no effect', () => {
      const options = {
        ...baseOptions,
        plugins: [TailwindcssPlugin, mergePlugin],
      };

      expect(format(nextEnvDTSCode, options)).toBe(nextEnvDTSCodeResult);
    });
  });

  describe('Next.js API route', () => {
    test('Standalone use without merge plugin', () => {
      const options = {
        ...baseOptions,
        plugins: [TailwindcssPlugin],
      };

      expect(format(nextAPIRouteCode, options)).toBe(nextAPIRouteCodeResultWithoutBraceStylePlugin);
    });

    test('A combination of a single plugin and a merge plugin also has no effect', () => {
      const options = {
        ...baseOptions,
        plugins: [TailwindcssPlugin, mergePlugin],
      };

      expect(format(nextAPIRouteCode, options)).toBe(nextAPIRouteCodeResultWithoutBraceStylePlugin);
    });
  });
});
