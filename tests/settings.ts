import type { Plugin } from 'prettier';
import {
  parsers as tailwindcssParsers,
  printers as tailwindcssPrinters,
  options as tailwindcssOptions, // @ts-ignore
} from 'prettier-plugin-tailwindcss';

import mergePlugin from '@/index';

export { format } from 'prettier';
export { default as SortImportsPlugin } from '@trivago/prettier-plugin-sort-imports';
export { default as BraceStylePlugin } from 'prettier-plugin-brace-style';

export const TailwindcssPlugin = {
  parsers: tailwindcssParsers,
  printers: tailwindcssPrinters,
  options: tailwindcssOptions,
};

export const dummyPlugin: Plugin = {
  parsers: {
    ...mergePlugin.parsers,
  },
};
