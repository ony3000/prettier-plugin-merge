import type { Fixture } from 'test-settings';
import { baseOptions } from 'test-settings';

import { thisPlugin, braceStylePluginOptions, classnamesPluginOptions, testEach } from '../adaptor';

const options = {
  ...baseOptions,
  parser: 'svelte',
};

const fixtures: Fixture[] = [
  {
    name: 'two plugins with some overlapping formatting regions (1) - svelte -> brace-style',
    input: `
<script>
function getDate() {
    return new Date();
}

const now = getDate();
</script>

<div class="bg-gray-100/50 border border-zinc-400/30 dark:bg-neutral-900/50 dark:border-neutral-500/30 px-4 py-4 rounded-xl">
    <span>Now: {now}</span>
</div>
`,
    output: `<script>
  function getDate()
  {
    return new Date();
  }

  const now = getDate();
</script>

<div
  class="bg-gray-100/50 border border-zinc-400/30 dark:bg-neutral-900/50 dark:border-neutral-500/30 px-4 py-4 rounded-xl"
>
  <span>Now: {now}</span>
</div>
`,
    options: {
      plugins: ['prettier-plugin-svelte', 'prettier-plugin-brace-style', thisPlugin],
      ...braceStylePluginOptions,
    },
  },
  {
    name: 'two plugins with some overlapping formatting regions (2) - brace-style -> svelte',
    input: `
<script>
function getDate() {
    return new Date();
}

const now = getDate();
</script>

<div class="bg-gray-100/50 border border-zinc-400/30 dark:bg-neutral-900/50 dark:border-neutral-500/30 px-4 py-4 rounded-xl">
    <span>Now: {now}</span>
</div>
`,
    output: `<script>
  function getDate()
  {
    return new Date();
  }

  const now = getDate();
</script>

<div
  class="bg-gray-100/50 border border-zinc-400/30 dark:bg-neutral-900/50 dark:border-neutral-500/30 px-4 py-4 rounded-xl"
>
  <span>Now: {now}</span>
</div>
`,
    options: {
      plugins: ['prettier-plugin-brace-style', 'prettier-plugin-svelte', thisPlugin],
      ...braceStylePluginOptions,
    },
  },
  {
    name: 'two plugins with some overlapping formatting regions (3) - svelte -> tailwindcss',
    input: `
<script>
function getDate() {
    return new Date();
}

const now = getDate();
</script>

<div class="bg-gray-100/50 border border-zinc-400/30 dark:bg-neutral-900/50 dark:border-neutral-500/30 px-4 py-4 rounded-xl">
    <span>Now: {now}</span>
</div>
`,
    output: `<script>
  function getDate() {
    return new Date();
  }

  const now = getDate();
</script>

<div
  class="rounded-xl border border-zinc-400/30 bg-gray-100/50 px-4 py-4 dark:border-neutral-500/30 dark:bg-neutral-900/50"
>
  <span>Now: {now}</span>
</div>
`,
    options: {
      plugins: ['prettier-plugin-svelte', 'prettier-plugin-tailwindcss', thisPlugin],
    },
  },
  {
    name: 'two plugins with some overlapping formatting regions (4) - tailwindcss -> svelte',
    input: `
<script>
function getDate() {
    return new Date();
}

const now = getDate();
</script>

<div class="bg-gray-100/50 border border-zinc-400/30 dark:bg-neutral-900/50 dark:border-neutral-500/30 px-4 py-4 rounded-xl">
    <span>Now: {now}</span>
</div>
`,
    output: `<script>
  function getDate() {
    return new Date();
  }

  const now = getDate();
</script>

<div
  class="rounded-xl border border-zinc-400/30 bg-gray-100/50 px-4 py-4 dark:border-neutral-500/30 dark:bg-neutral-900/50"
>
  <span>Now: {now}</span>
</div>
`,
    options: {
      plugins: ['prettier-plugin-tailwindcss', 'prettier-plugin-svelte', thisPlugin],
    },
  },
  {
    name: 'two plugins with some overlapping formatting regions (5) - svelte -> classnames',
    input: `
<script>
function getDate() {
    return new Date();
}

const now = getDate();
</script>

<div class="bg-gray-100/50 border border-zinc-400/30 dark:bg-neutral-900/50 dark:border-neutral-500/30 px-4 py-4 rounded-xl">
    <span>Now: {now}</span>
</div>
`,
    output: `<script>
  function getDate() {
    return new Date();
  }

  const now = getDate();
</script>

<div
  class="bg-gray-100/50 border border-zinc-400/30 dark:bg-neutral-900/50
dark:border-neutral-500/30 px-4 py-4 rounded-xl"
>
  <span>Now: {now}</span>
</div>
`,
    options: {
      plugins: ['prettier-plugin-svelte', 'prettier-plugin-classnames', thisPlugin],
      ...classnamesPluginOptions,
    },
  },
  {
    name: 'two plugins with some overlapping formatting regions (6) - classnames -> svelte',
    input: `
<script>
function getDate() {
    return new Date();
}

const now = getDate();
</script>

<div class="bg-gray-100/50 border border-zinc-400/30 dark:bg-neutral-900/50 dark:border-neutral-500/30 px-4 py-4 rounded-xl">
    <span>Now: {now}</span>
</div>
`,
    output: `<script>
  function getDate() {
    return new Date();
  }

  const now = getDate();
</script>

<div
  class="bg-gray-100/50 border border-zinc-400/30 dark:bg-neutral-900/50
dark:border-neutral-500/30 px-4 py-4 rounded-xl"
>
  <span>Now: {now}</span>
</div>
`,
    options: {
      plugins: ['prettier-plugin-classnames', 'prettier-plugin-svelte', thisPlugin],
      ...classnamesPluginOptions,
    },
  },
];

testEach(fixtures, options);
