import type { Options, Plugin } from 'prettier';
import {
  parsers as tailwindcssParsers,
  printers as tailwindcssPrinters,
  options as tailwindcssOptions, // @ts-ignore
} from 'prettier-plugin-tailwindcss';

import mergePlugin from '@/index';

export type Fixture = {
  name: string;
  input: string;
  output: string;
  options?: Options;
};

export { format } from 'prettier';
export { default as sortImportsPlugin } from '@trivago/prettier-plugin-sort-imports';
export { default as braceStylePlugin } from 'prettier-plugin-brace-style';

export const tailwindcssPlugin = {
  parsers: tailwindcssParsers,
  printers: tailwindcssPrinters,
  options: tailwindcssOptions,
};

export const dummyPlugin: Plugin = {
  parsers: {
    ...mergePlugin.parsers,
  },
};

export const baseOptions: Options = {
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: false,
  jsxSingleQuote: false,
  trailingComma: 'all',
  bracketSpacing: true,
  bracketSameLine: false,
  jsxBracketSameLine: false,
  rangeStart: 0,
  rangeEnd: Infinity,
  requirePragma: false,
  insertPragma: false,
  proseWrap: 'preserve',
  arrowParens: 'always',
  htmlWhitespaceSensitivity: 'css',
  endOfLine: 'lf',
  quoteProps: 'as-needed',
  vueIndentScriptAndStyle: false,
  embeddedLanguageFormatting: 'auto',
  singleAttributePerLine: false,
};
