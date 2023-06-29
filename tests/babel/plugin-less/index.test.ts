import type { Options } from 'prettier';

import mergePlugin from '@/index';

import { format } from '../../settings';
import { counterComponentCode, jestConfigCode, jestSetupCode, nextConfigCode } from '../fixtures';
import {
  counterComponentCodeResult,
  jestConfigCodeResult,
  jestSetupCodeResult,
  nextConfigCodeResult,
} from './expected-results';

const baseOptions: Options = {
  parser: 'babel',
};

describe('[babel] plugin-less', () => {
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

  describe('jest.config.js', () => {
    test('No plugin', () => {
      const options = {
        ...baseOptions,
        plugins: [],
      };

      expect(format(jestConfigCode, options)).toBe(jestConfigCodeResult);
    });

    test('Merge plugin alone has no effect', () => {
      const options = {
        ...baseOptions,
        plugins: [mergePlugin],
      };

      expect(format(jestConfigCode, options)).toBe(jestConfigCodeResult);
    });
  });

  describe('jest.setup.js', () => {
    test('No plugin', () => {
      const options = {
        ...baseOptions,
        plugins: [],
      };

      expect(format(jestSetupCode, options)).toBe(jestSetupCodeResult);
    });

    test('Merge plugin alone has no effect', () => {
      const options = {
        ...baseOptions,
        plugins: [mergePlugin],
      };

      expect(format(jestSetupCode, options)).toBe(jestSetupCodeResult);
    });
  });

  describe('next.config.js', () => {
    test('No plugin', () => {
      const options = {
        ...baseOptions,
        plugins: [],
      };

      expect(format(nextConfigCode, options)).toBe(nextConfigCodeResult);
    });

    test('Merge plugin alone has no effect', () => {
      const options = {
        ...baseOptions,
        plugins: [mergePlugin],
      };

      expect(format(nextConfigCode, options)).toBe(nextConfigCodeResult);
    });
  });
});
