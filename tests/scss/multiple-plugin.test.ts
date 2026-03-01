import { thisPlugin, braceStylePluginOptions, testSnapshotEach } from '../adaptor';
import type { Fixture } from '../settings';
import { baseOptions } from '../settings';

const options = {
  ...baseOptions,
  parser: 'scss',
};

const fixtures: Omit<Fixture, 'output'>[] = [
  {
    name: 'two plugins whose formatting regions are disjoint (1) - brace-style -> tailwindcss',
    input: `
.callout {
  @apply bg-gray-100/50 border border-zinc-400/30 dark:bg-neutral-900/50 dark:border-neutral-500/30 px-4 py-4 rounded-xl;
}
`,
    options: {
      plugins: ['prettier-plugin-brace-style', 'prettier-plugin-tailwindcss', thisPlugin],
      ...braceStylePluginOptions,
    },
  },
  {
    name: 'two plugins whose formatting regions are disjoint (2) - tailwindcss -> brace-style',
    input: `
.callout {
  @apply bg-gray-100/50 border border-zinc-400/30 dark:bg-neutral-900/50 dark:border-neutral-500/30 px-4 py-4 rounded-xl;
}
`,
    options: {
      plugins: ['prettier-plugin-tailwindcss', 'prettier-plugin-brace-style', thisPlugin],
      ...braceStylePluginOptions,
    },
  },
];

testSnapshotEach(fixtures, options);
