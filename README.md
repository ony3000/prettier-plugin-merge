# prettier-plugin-merge

A Prettier plugin that sequentially merges the formatting results of other Prettier plugins.

![Schematic diagram of how formats are merged.](.github/banner.png)

## Installation

For Prettier v2:

```sh
npm install -D prettier@^2 prettier-plugin-merge
```

For Prettier v3:

```sh
npm install -D prettier prettier-plugin-merge
```

## Configuration

**Note**: This plugin MUST come last. Other plugins usually have no order constraints.

JSON example:

<!-- prettier-ignore -->
```json
{
  "plugins": [
    "prettier-plugin-tailwindcss",
    "prettier-plugin-classnames",
    "prettier-plugin-merge"
  ]
}
```

JS example (CommonJS module):

```javascript
module.exports = {
  plugins: [
    '@trivago/prettier-plugin-sort-imports',
    'prettier-plugin-brace-style',
    'prettier-plugin-merge',
  ],
  braceStyle: 'stroustrup',
};
```

JS example (ES module):

```javascript
export default {
  plugins: [
    'prettier-plugin-brace-style',
    '@trivago/prettier-plugin-sort-imports',
    'prettier-plugin-merge',
  ],
  importOrder: ['<THIRD_PARTY_MODULES>', '^@[^/]+/(.*)$', '^@/(.*)$', '^[./]'],
  importOrderSeparation: true,
};
```

## Compatibility with other Prettier plugins

All other plugins used with this plugin must be compatible with your version of Prettier.

For example, suppose you have three plugins:

- `prettier-plugin-A`: Only compatible with Prettier v2
- `prettier-plugin-B`: Only compatible with Prettier v3
- `prettier-plugin-X`: Compatible with both versions

Prettier v2 users can only configure `prettier-plugin-A` and `prettier-plugin-X`, and Prettier v3 users can only configure `prettier-plugin-B` and `prettier-plugin-X`.
