import { format } from 'prettier';
import type { Fixture } from 'test-settings';
import { baseOptions } from 'test-settings';
import { describe, expect, test } from 'vitest';

const options = {
  ...baseOptions,
  parser: 'vue',
};

const fixtures: Fixture[] = [
  {
    name: '',
    input: ``,
    output: ``,
    options: {
      plugins: [],
    },
  },
];

describe('vue/zero-plugin', () => {
  for (const fixture of fixtures) {
    test(fixture.name, async () => {
      expect(
        await format(fixture.input, {
          ...options,
          ...(fixture.options ?? {}),
        }),
      ).toBe(fixture.output);
    });
  }
});
