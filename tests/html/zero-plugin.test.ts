import { thisPlugin, testEach } from '../adaptor';
import type { Fixture } from '../settings';
import { baseOptions } from '../settings';

const options = {
  ...baseOptions,
  parser: 'html',
};

const fixtures: Fixture[] = [
  {
    name: 'no plugins (1)',
    input: `
<template>
  <div class="bg-gray-100/50 border border-zinc-400/30 dark:bg-neutral-900/50 dark:border-neutral-500/30 px-4 py-4 rounded-xl">
    <slot></slot>
  </div>
</template>
`,
    output: `<template>
  <div
    class="bg-gray-100/50 border border-zinc-400/30 dark:bg-neutral-900/50 dark:border-neutral-500/30 px-4 py-4 rounded-xl"
  >
    <slot></slot>
  </div>
</template>
`,
    options: {
      plugins: [],
    },
  },
  {
    name: 'no plugins (2) - merge plugin alone has no effect',
    input: `
<template>
  <div class="bg-gray-100/50 border border-zinc-400/30 dark:bg-neutral-900/50 dark:border-neutral-500/30 px-4 py-4 rounded-xl">
    <slot></slot>
  </div>
</template>
`,
    output: `<template>
  <div
    class="bg-gray-100/50 border border-zinc-400/30 dark:bg-neutral-900/50 dark:border-neutral-500/30 px-4 py-4 rounded-xl"
  >
    <slot></slot>
  </div>
</template>
`,
    options: {
      plugins: [thisPlugin],
    },
  },
];

testEach(fixtures, options);
