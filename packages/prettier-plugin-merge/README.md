# prettier-plugin-merge

A Prettier plugin that sequentially applies the formatting results of other Prettier plugins.

![The process of applying formats sequentially.](https://github.com/ony3000/prettier-plugin-merge/assets/8164191/36abd9f6-dd0b-4695-9ffa-f8a316cbf69d)

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
