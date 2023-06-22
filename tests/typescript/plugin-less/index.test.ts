import { format } from 'prettier';
import { baseOptions } from '../settings';
import { tsxCounterComponentCode } from '../../fixtures';
import { tsxCounterComponentCodeResult } from './expected-results';

const options = {
  ...baseOptions,
};

describe('[typescript] no plugin', () => {
  test('Default formatting of prettier', () => {
    expect(format(tsxCounterComponentCode, options)).toBe(tsxCounterComponentCodeResult);
  });
});
