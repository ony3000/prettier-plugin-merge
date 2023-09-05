import type { Options, Plugin } from 'prettier';

import mergePlugin from '@/index';

import { format, dummyPlugin } from '../settings';

let callCount = 0;

const printerWrappedMergePlugin: Plugin = {
  ...mergePlugin,
  printers: {
    'merging-ast': {
      print: (...args) => {
        callCount += 1;

        if (callCount > 10) {
          throw new Error('Aborting formatting because it may have caused an infinite loop.');
        }

        return mergePlugin.printers!['merging-ast'].print(...args);
      },
    },
  },
};

const options: Options = {
  parser: 'typescript',
  plugins: [printerWrappedMergePlugin, dummyPlugin],
};

describe('typescript/others', () => {
  test('print function should only be called once', () => {
    const input = '// Lorem ipsum\n';

    callCount = 0;
    format(input, options);
    expect(callCount).toBe(1);
  });
});
