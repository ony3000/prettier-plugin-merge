import type { Options } from 'prettier';

import mergePlugin from '@/index';

import { format } from '../../settings';
import { counterComponentCode } from '../fixtures';
import { counterComponentCodeResult } from './expected-results';

const baseOptions: Options = {
  parser: 'typescript',
};

describe('[typescript] plugin-less', () => {
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
