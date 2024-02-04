import { format } from 'prettier';
import type { Fixture } from 'test-settings';
import { baseOptions } from 'test-settings';
import { describe, expect, test } from 'vitest';

// eslint-disable-next-line import/no-extraneous-dependencies
import * as thisPlugin from '@/packages/v3-plugin';

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

describe('astro/zero-plugin', () => {
  for (const fixture of fixtures) {
    test(fixture.name, async () => {
      await expect(() =>
        format(fixture.input, {
          ...options,
          ...(fixture.options ?? {}),
        }),
      ).rejects.toThrowError();
    });
  }
});
