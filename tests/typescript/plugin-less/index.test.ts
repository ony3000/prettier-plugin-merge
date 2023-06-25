import type { Options } from 'prettier';
import { format } from 'prettier';

import mergePlugin from '@/index';

import { tsxCounterComponentCode } from '../../fixtures';
import { tsxCounterComponentCodeResult } from './expected-results';

const baseOptions: Options = {
  parser: 'typescript',
};

describe('[typescript] plugin-less', () => {
  test('No plugin', () => {
    const options = {
      ...baseOptions,
      plugins: [],
    };

    expect(format(tsxCounterComponentCode, options)).toBe(tsxCounterComponentCodeResult);
  });

  test('Merge plugin alone has no effect', () => {
    const options = {
      ...baseOptions,
      plugins: [mergePlugin],
    };

    expect(format(tsxCounterComponentCode, options)).toBe(tsxCounterComponentCodeResult);
  });
});
