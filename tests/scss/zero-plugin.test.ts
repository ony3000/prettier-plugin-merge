import { testSnapshotEach } from '../adaptor';
import type { Fixture } from '../settings';
import { baseOptions } from '../settings';

const options = {
  ...baseOptions,
  parser: 'scss',
};

const fixtures: Omit<Fixture, 'output'>[] = [
  {
    name: 'no plugins',
    input: `
.callout {
  @apply bg-gray-100/50 border border-zinc-400/30 dark:bg-neutral-900/50 dark:border-neutral-500/30 px-4 py-4 rounded-xl;
}
`,
    options: {
      plugins: [],
    },
  },
];

testSnapshotEach(fixtures, options);
