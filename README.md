# prettier-plugin-merge

A Prettier plugin that sequentially applies the formatting results of other Prettier plugins.

**Note**: Prettier v3 is not yet supported.

![Comparison of formatting without merge plugin and formatting with merge plugin.](./.github/banner.png)

## Installation

```sh
npm install --save-dev prettier@~2.8 prettier-plugin-merge
```

```sh
yarn add --dev prettier@~2.8 prettier-plugin-merge
```

```sh
pnpm add --save-dev prettier@~2.8 prettier-plugin-merge
```

## Configuration

**Note**: This plugin MUST come last. Other plugins usually have no order constraints, but it is recommended that plugins implementing printers come immediately before this plugin.

JSON:

```json
{
  "plugins": [
    "OTHER_PRETTIER_PLUGIN_1",
    "OTHER_PRETTIER_PLUGIN_2",
    "OTHER_PRETTIER_PLUGIN_3",
    "prettier-plugin-merge"
  ]
}
```

JS:

```javascript
module.exports = {
  plugins: [
    require('OTHER_PRETTIER_PLUGIN_1'),
    require('OTHER_PRETTIER_PLUGIN_2'),
    require('OTHER_PRETTIER_PLUGIN_3'),
    require('prettier-plugin-merge'),
  ],
};
```
