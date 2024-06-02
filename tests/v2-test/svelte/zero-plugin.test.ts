import { format } from 'prettier';
import type { Fixture } from 'test-settings';
import { baseOptions } from 'test-settings';
import { describe, expect, test } from 'vitest';

// eslint-disable-next-line import/no-extraneous-dependencies
import * as thisPlugin from '@/packages/v2-plugin';

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

describe('svelte/zero-plugin', () => {
  for (const fixture of fixtures) {
    test(fixture.name, () => {
      expect(() =>
        format(fixture.input, {
          ...options,
          ...(fixture.options ?? {}),
        }),
      ).toThrowError();
    });
  }
});
