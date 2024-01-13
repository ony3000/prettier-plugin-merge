# prettier-plugin-merge

A Prettier plugin that sequentially applies the formatting results of other Prettier plugins.

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

JSON:

```json
{
  "plugins": [
    "other-prettier-plugin-1",
    "other-prettier-plugin-2",
    "other-prettier-plugin-3",
    "prettier-plugin-merge"
  ]
}
```

JS (CommonJS module):

```javascript
module.exports = {
  plugins: [
    'other-prettier-plugin-1',
    'other-prettier-plugin-2',
    'other-prettier-plugin-3',
    'prettier-plugin-merge',
  ],
};
```

JS (ES module):

```javascript
export default {
  plugins: [
    'other-prettier-plugin-1',
    'other-prettier-plugin-2',
    'other-prettier-plugin-3',
    'prettier-plugin-merge',
  ],
};
```

## Compatibility with other Prettier plugins

All other plugins used with this plugin must be compatible with your version of Prettier.

For example, suppose you have three plugins:

- `prettier-plugin-A`: Only compatible with Prettier v2
- `prettier-plugin-B`: Only compatible with Prettier v3
- `prettier-plugin-X`: Compatible with both versions

Prettier v2 users can only configure `prettier-plugin-A` and `prettier-plugin-X`, and Prettier v3 users can only configure `prettier-plugin-B` and `prettier-plugin-X`.
