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
export * as mergePlugin from "bundle-entry";
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

// @ts-ignore
export { default as baseOptions } from "./prettier.config";
