# prettier-plugin-merge

A Prettier plugin that sequentially applies the formatting results of other Prettier plugins.

**Note**: Prettier v3 is not yet supported.

![The process of applying formats sequentially.](https://github.com/ony3000/prettier-plugin-merge/assets/8164191/36abd9f6-dd0b-4695-9ffa-f8a316cbf69d)

## Installation

```sh
npm install -D prettier@~2.8 prettier-plugin-merge
```

```sh
yarn add -D prettier@~2.8 prettier-plugin-merge
```

```sh
pnpm add -D prettier@~2.8 prettier-plugin-merge
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
