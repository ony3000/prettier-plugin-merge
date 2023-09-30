# prettier-plugin-merge

A Prettier plugin that sequentially applies the formatting results of other Prettier plugins.

**Note**: Prettier v3 is not yet supported.

![The process of applying formats sequentially.](./.github/banner.png)

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

JS:

```javascript
module.exports = {
  plugins: [
    require('other-prettier-plugin-1'),
    require('other-prettier-plugin-2'),
    require('other-prettier-plugin-3'),
    require('prettier-plugin-merge'),
  ],
};
```
