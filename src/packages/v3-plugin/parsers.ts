import type { Parser } from 'prettier';
import { parsers as babelParsers } from 'prettier/plugins/babel';
import { parsers as htmlParsers } from 'prettier/plugins/html';
import { parsers as typescriptParsers } from 'prettier/plugins/typescript';

export const parsers: { [parserName: string]: Parser } = {
  babel: {
    ...babelParsers.babel,
    astFormat: 'merging-ast',
  },
  typescript: {
    ...typescriptParsers.typescript,
    astFormat: 'merging-ast',
  },
  vue: {
    ...htmlParsers.vue,
    astFormat: 'merging-ast',
  },
};
