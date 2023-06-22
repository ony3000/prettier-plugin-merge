import { format } from 'prettier';
import { baseOptions } from '../settings';
import { jsxCounterComponentCode } from '../../fixtures';
import { jsxCounterComponentCodeResult } from './expected-results';

const options = {
  ...baseOptions,
};

describe('[babel] no plugin', () => {
  test('Default formatting of prettier', () => {
    expect(format(jsxCounterComponentCode, options)).toBe(jsxCounterComponentCodeResult);
  });
});
