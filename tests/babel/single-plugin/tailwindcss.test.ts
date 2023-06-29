import type { Options } from 'prettier';

import mergePlugin from '@/index';

import { format, TailwindcssPlugin } from '../../settings';
import { counterComponentCode } from '../fixtures';
import { tailwindcssPluginResult } from './expected-results';

const baseOptions: Options = {
  parser: 'babel',
};

describe('[babel] prettier-plugin-tailwindcss', () => {
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
