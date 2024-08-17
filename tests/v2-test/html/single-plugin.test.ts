import type { Fixture } from 'test-settings';
import { baseOptions } from 'test-settings';

import { thisPlugin, noopPlugin, classnamesPluginOptions, testEach } from '../adaptor';

const options = {
  ...baseOptions,
  parser: 'html',
};

const fixtures: Fixture[] = [
  {
    name: 'tailwindcss plugin (1) - standalone use',
    input: `
<template>
  <div class="bg-gray-100/50 border border-zinc-400/30 dark:bg-neutral-900/50 dark:border-neutral-500/30 px-4 py-4 rounded-xl">
    <slot></slot>
  </div>
</template>
`,
    output: `<template>
  <div
    class="rounded-xl border border-zinc-400/30 bg-gray-100/50 px-4 py-4 dark:border-neutral-500/30 dark:bg-neutral-900/50"
  >
    <slot></slot>
  </div>
</template>
`,
    options: {
      plugins: ['prettier-plugin-tailwindcss'],
    },
  },
  {
    name: 'tailwindcss plugin (2) - a combination of a single plugin and a merge plugin also has no effect',
    input: `
<template>
  <div class="bg-gray-100/50 border border-zinc-400/30 dark:bg-neutral-900/50 dark:border-neutral-500/30 px-4 py-4 rounded-xl">
    <slot></slot>
  </div>
</template>
`,
    output: `<template>
  <div
    class="rounded-xl border border-zinc-400/30 bg-gray-100/50 px-4 py-4 dark:border-neutral-500/30 dark:bg-neutral-900/50"
  >
    <slot></slot>
  </div>
</template>
`,
    options: {
      plugins: ['prettier-plugin-tailwindcss', thisPlugin],
    },
  },
  {
    name: 'classnames plugin (1) - standalone use',
    input: `
<template>
  <div class="bg-gray-100/50 border border-zinc-400/30 dark:bg-neutral-900/50 dark:border-neutral-500/30 px-4 py-4 rounded-xl">
    <slot></slot>
  </div>
</template>
`,
    output: `<template>
  <div
    class="bg-gray-100/50 border border-zinc-400/30 dark:bg-neutral-900/50
dark:border-neutral-500/30 px-4 py-4 rounded-xl"
  >
    <slot></slot>
  </div>
</template>
`,
    options: {
      plugins: ['prettier-plugin-classnames'],
      ...classnamesPluginOptions,
    },
  },
  {
    name: 'classnames plugin (2) - a combination of a single plugin and a merge plugin also has no effect',
    input: `
<template>
  <div class="bg-gray-100/50 border border-zinc-400/30 dark:bg-neutral-900/50 dark:border-neutral-500/30 px-4 py-4 rounded-xl">
    <slot></slot>
  </div>
</template>
`,
    output: `<template>
  <div
    class="bg-gray-100/50 border border-zinc-400/30 dark:bg-neutral-900/50
dark:border-neutral-500/30 px-4 py-4 rounded-xl"
  >
    <slot></slot>
  </div>
</template>
`,
    options: {
      plugins: ['prettier-plugin-classnames', thisPlugin],
      ...classnamesPluginOptions,
    },
  },
  {
    name: 'issue #31 (1) - standalone use',
    input: `
<template>
  <div>
    <span></span>
  </div>
</template>
`,
    output: `<template>\r\n  <div>\r\n    <span></span>\r\n  </div>\r\n</template>\r\n`,
    options: {
      plugins: [noopPlugin],
      endOfLine: 'crlf',
    },
  },
  {
    name: 'issue #31 (2) - a combination of a single plugin and a merge plugin also has no effect',
    input: `
<template>
  <div>
    <span></span>
  </div>
</template>
`,
    output: `<template>\r\n  <div>\r\n    <span></span>\r\n  </div>\r\n</template>\r\n`,
    options: {
      plugins: [noopPlugin, thisPlugin],
      endOfLine: 'crlf',
    },
  },
];

testEach(fixtures, options);
