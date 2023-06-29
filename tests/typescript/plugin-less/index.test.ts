import type { Options } from 'prettier';

import mergePlugin from '@/index';

import { format } from '../../settings';
import { counterComponentCode, nextEnvDTSCode, nextAPIRouteCode } from '../fixtures';
import {
  counterComponentCodeResult,
  nextEnvDTSCodeResult,
  nextAPIRouteCodeResult,
} from './expected-results';

const baseOptions: Options = {
  parser: 'typescript',
};

describe('[typescript] plugin-less', () => {
  describe('Counter Component', () => {
    test('No plugin', () => {
      const options = {
        ...baseOptions,
        plugins: [],
      };

      expect(format(counterComponentCode, options)).toBe(counterComponentCodeResult);
    });

    test('Merge plugin alone has no effect', () => {
      const options = {
        ...baseOptions,
        plugins: [mergePlugin],
      };

      expect(format(counterComponentCode, options)).toBe(counterComponentCodeResult);
    });
  });

  describe('next-env.d.ts', () => {
    test('No plugin', () => {
      const options = {
        ...baseOptions,
        plugins: [],
      };

      expect(format(nextEnvDTSCode, options)).toBe(nextEnvDTSCodeResult);
    });

    test('Merge plugin alone has no effect', () => {
      const options = {
        ...baseOptions,
        plugins: [mergePlugin],
      };

      expect(format(nextEnvDTSCode, options)).toBe(nextEnvDTSCodeResult);
    });
  });

  describe('Next.js API route', () => {
    test('No plugin', () => {
      const options = {
        ...baseOptions,
        plugins: [],
      };

      expect(format(nextAPIRouteCode, options)).toBe(nextAPIRouteCodeResult);
    });

    test('Merge plugin alone has no effect', () => {
      const options = {
        ...baseOptions,
        plugins: [mergePlugin],
      };

      expect(format(nextAPIRouteCode, options)).toBe(nextAPIRouteCodeResult);
    });
  });
});
