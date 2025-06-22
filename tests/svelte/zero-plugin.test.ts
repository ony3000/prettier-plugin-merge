import { thisPlugin, testErrorEach } from '../adaptor';
import type { Fixture } from '../settings';
import { baseOptions } from '../settings';

const options = {
  ...baseOptions,
  parser: 'svelte',
};

const fixtures: Fixture[] = [
  {
    name: 'no plugins (1) - it will not work without the svelte plugin',
    input: `any input`,
    output: `any output`,
    options: {
      plugins: [],
    },
  },
  {
    name: 'no plugins (2) - it will not work without the svelte plugin',
    input: `this plugin does not have`,
    output: `a built-in svelte compiler (or parser).`,
    options: {
      plugins: [thisPlugin],
    },
  },
];

testErrorEach(fixtures, options);
