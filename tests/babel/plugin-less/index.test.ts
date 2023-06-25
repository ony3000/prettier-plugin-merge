import { format } from 'prettier';

import mergePlugin from '@/index';

import { jsxCounterComponentCode } from '../../fixtures';
import { baseOptions } from '../settings';
import { jsxCounterComponentCodeResult } from './expected-results';

describe('[babel] plugin-less', () => {
  test('No plugin', () => {
    const options = {
      ...baseOptions,
      plugins: [],
    };

    expect(format(jsxCounterComponentCode, options)).toBe(jsxCounterComponentCodeResult);
  });

  test('Merge plugin alone has no effect', () => {
    const options = {
      ...baseOptions,
      plugins: [mergePlugin],
    };

    expect(format(jsxCounterComponentCode, options)).toBe(jsxCounterComponentCodeResult);
  });
});
