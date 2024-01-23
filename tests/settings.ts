import type { Options } from "prettier";
import {
  parsers as tailwindcssParsers,
  printers as tailwindcssPrinters,
  options as tailwindcssOptions,
} from "prettier-plugin-tailwindcss";

export type Fixture = {
  name: string;
  input: string;
  output: string;
  options?: Options;
};

// @ts-ignore
export * as mergePlugin from "prettier-plugin-merge";
export { format } from "prettier";
export { default as sortImportsPlugin } from "@trivago/prettier-plugin-sort-imports";
// @ts-ignore
export * as braceStylePlugin from "prettier-plugin-brace-style";
// @ts-ignore
export * as classnamesPlugin from "prettier-plugin-classnames";

export const tailwindcssPlugin = {
  parsers: tailwindcssParsers,
  printers: tailwindcssPrinters,
  options: tailwindcssOptions,
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
