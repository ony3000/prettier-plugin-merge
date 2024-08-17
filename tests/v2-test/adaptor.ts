import type { Plugin } from 'prettier';
import { format } from 'prettier';
import { parsers as babelParsers } from 'prettier/parser-babel';
import { parsers as htmlParsers } from 'prettier/parser-html';
import { parsers as typescriptParsers } from 'prettier/parser-typescript';
import type { Fixture } from 'test-settings';
import { expect, test } from 'vitest';

// eslint-disable-next-line import/no-extraneous-dependencies
import * as thisPlugin from '@/packages/v2-plugin';

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
  test.each(fixtures)('$name', ({ input, output, options: fixtureOptions }) => {
    const fixedOptions = {
      ...options,
      ...(fixtureOptions ?? {}),
    };
    const formattedText = format(input, fixedOptions);

    expect(formattedText).toBe(output);
  });
}

export function testErrorEach(
  fixtures: Fixture[],
  options: PrettierBaseOptions & { parser: string },
) {
  test.each(fixtures)('$name', ({ input, options: fixtureOptions }) => {
    const fixedOptions = {
      ...options,
      ...(fixtureOptions ?? {}),
    };

    expect(() => format(input, fixedOptions)).toThrowError();
  });
}
