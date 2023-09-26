const { resolve } = require('node:path');

const project = resolve(process.cwd(), 'tsconfig.json');

module.exports = {
  extends: ['airbnb-base', 'airbnb-typescript/base', 'prettier'],
  parserOptions: {
    project,
  },
  plugins: ['import'],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.mts', '.cts', '.d.ts'],
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts'],
      },
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
  ignorePatterns: ['**/*.*js', '**/*.jsx', '**/*.d.ts'],
  rules: {
    '@typescript-eslint/no-loop-func': 0,
    'import/prefer-default-export': 0,
    'no-restricted-syntax': 0,
  },
};
