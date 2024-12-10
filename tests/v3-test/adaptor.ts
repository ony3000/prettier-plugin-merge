import type { Plugin } from 'prettier';
import { format } from 'prettier';
import { parsers as babelParsers } from 'prettier/plugins/babel';
import { parsers as htmlParsers } from 'prettier/plugins/html';
import { parsers as typescriptParsers } from 'prettier/plugins/typescript';
import type { Fixture } from 'test-settings';
import { describe, expect, onTestFailed, test } from 'vitest';

// eslint-disable-next-line import/no-extraneous-dependencies
import * as thisPlugin from '@/packages/v3-plugin';

export { thisPlugin };

export const noopPlugin: Plugin = {
  parsers: {
    babel: babelParsers.babel,
    typescript: typescriptParsers.typescript,
    angular: htmlParsers.angular,
    html: htmlParsers.html,
    vue: htmlParsers.vue,
  },
};

export const sortImportsPluginOptions = {
  importOrder: ['<THIRD_PARTY_MODULES>', '^@[^/]+/(.*)$', '^@/(.*)$', '^[./]'],
  importOrderSeparation: true,
};

export const braceStylePluginOptions = {
  braceStyle: 'allman',
};

export const classnamesPluginOptions = {
  endingPosition: 'absolute',
};

export function testEach(fixtures: Fixture[], options: PrettierBaseOptions & { parser: string }) {
  test.each(fixtures)('$name', async ({ input, output, options: fixtureOptions }) => {
    const fixedOptions = {
      ...options,
      ...(fixtureOptions ?? {}),
    };
    const formattedText = await format(input, fixedOptions);

    expect(formattedText).toBe(output);
  });
}

export function testSnapshotEach(
  fixtures: Omit<Fixture, 'output'>[],
  options: PrettierBaseOptions & { parser: string },
) {
  describe.each(fixtures)('$name', async ({ input, options: fixtureOptions }) => {
    const fixedOptions = {
      ...options,
      ...(fixtureOptions ?? {}),
    };
    const formattedText = await format(input, fixedOptions);
    let skipSecondTest = false;

    test('expectation', () => {
      onTestFailed(() => {
        skipSecondTest = true;
      });

      expect(formattedText).toMatchSnapshot();
    });

    test('consistency; if there are no plugins or only one, adding a merge plugin should have the same result', async ({
      skip,
    }) => {
      const fixedPlugins = fixedOptions.plugins ?? [];

      if (skipSecondTest || fixedPlugins.length > 1) {
        skip();
      }

      const formattedTextWithThisPlugin = await format(formattedText, {
        ...fixedOptions,
        plugins: [...fixedPlugins, thisPlugin],
      });

      expect(formattedTextWithThisPlugin).toBe(formattedText);
    });
  });
}

export function testErrorEach(
  fixtures: Fixture[],
  options: PrettierBaseOptions & { parser: string },
) {
  test.each(fixtures)('$name', async ({ input, options: fixtureOptions }) => {
    const fixedOptions = {
      ...options,
      ...(fixtureOptions ?? {}),
    };

    await expect(() => format(input, fixedOptions)).rejects.toThrowError();
  });
}
