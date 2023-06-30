import type { Options } from 'prettier';

import mergePlugin from '@/index';

import { format, BraceStylePlugin } from '../../settings';
import { counterComponentCode, nextEnvDTSCode, nextAPIRouteCode } from '../fixtures';
import {
  braceStylePluginResult,
  nextEnvDTSCodeResult,
  nextAPIRouteCodeResultWithBraceStylePlugin,
} from './expected-results';

const baseOptions: Options = {
  parser: 'typescript',
};

describe('[typescript] prettier-plugin-brace-style', () => {
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

  describe('next-env.d.ts', () => {
    test('Standalone use without merge plugin', () => {
      const options = {
        ...baseOptions,
        plugins: [BraceStylePlugin],
        braceStyle: 'allman',
      };

      expect(format(nextEnvDTSCode, options)).toBe(nextEnvDTSCodeResult);
    });

    test('A combination of a single plugin and a merge plugin also has no effect', () => {
      const options = {
        ...baseOptions,
        plugins: [BraceStylePlugin, mergePlugin],
        braceStyle: 'allman',
      };

      expect(format(nextEnvDTSCode, options)).toBe(nextEnvDTSCodeResult);
    });
  });

  describe('Next.js API route', () => {
    test('Standalone use without merge plugin', () => {
      const options = {
        ...baseOptions,
        plugins: [BraceStylePlugin],
        braceStyle: 'allman',
      };

      expect(format(nextAPIRouteCode, options)).toBe(nextAPIRouteCodeResultWithBraceStylePlugin);
    });

    test('A combination of a single plugin and a merge plugin also has no effect', () => {
      const options = {
        ...baseOptions,
        plugins: [BraceStylePlugin, mergePlugin],
        braceStyle: 'allman',
      };

      expect(format(nextAPIRouteCode, options)).toBe(nextAPIRouteCodeResultWithBraceStylePlugin);
    });
  });
});
