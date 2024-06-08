import type { Fixture } from 'test-settings';
import { baseOptions } from 'test-settings';

import { thisPlugin, classnamesPluginOptions, testEach } from '../adaptor';

const options = {
  ...baseOptions,
  parser: 'angular',
};

const fixtures: Fixture[] = [
  {
    name: 'two plugins with some overlapping formatting regions (1) - tailwindcss -> classnames',
    input: `
<template>
  <div class="bg-gray-100/50 border border-zinc-400/30 dark:bg-neutral-900/50 dark:border-neutral-500/30 px-4 py-4 rounded-xl">
    <slot></slot>
  </div>
</template>
`,
    output: `<template>
  <div
    class="rounded-xl border border-zinc-400/30 bg-gray-100/50 px-4 py-4
dark:border-neutral-500/30 dark:bg-neutral-900/50"
  >
    <slot></slot>
  </div>
</template>
`,
    options: {
      plugins: ['prettier-plugin-tailwindcss', 'prettier-plugin-classnames', thisPlugin],
      ...classnamesPluginOptions,
    },
  },
  {
    name: 'two plugins with some overlapping formatting regions (2) - classnames -> tailwindcss',
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
      plugins: ['prettier-plugin-classnames', 'prettier-plugin-tailwindcss', thisPlugin],
      ...classnamesPluginOptions,
    },
  },
];

testEach(fixtures, options);
