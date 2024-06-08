import type { Fixture } from 'test-settings';
import { baseOptions } from 'test-settings';

import { thisPlugin, testErrorEach } from '../adaptor';

const options = {
  ...baseOptions,
  parser: 'astro',
};

const fixtures: Fixture[] = [
  {
    name: 'no plugins (1) - it will not work without the astro plugin',
    input: `any input`,
    output: `any output`,
    options: {
      plugins: [],
    },
  },
  {
    name: 'no plugins (2) - it will not work without the astro plugin',
    input: `this plugin does not have`,
    output: `a built-in astro compiler (or parser).`,
    options: {
      plugins: [thisPlugin],
    },
  },
];

testErrorEach(fixtures, options);
