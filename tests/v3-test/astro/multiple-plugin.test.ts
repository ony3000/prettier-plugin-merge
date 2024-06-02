import type { Fixture } from 'test-settings';
import { baseOptions } from 'test-settings';

import { thisPlugin, braceStylePluginOptions, classnamesPluginOptions, testEach } from '../adaptor';

const options = {
  ...baseOptions,
  parser: 'astro',
};

const fixtures: Fixture[] = [
  {
    name: 'two plugins with some overlapping formatting regions (1) - astro -> brace-style',
    input: `
---
function getDate() {
    return new Date();
}

const now = getDate();
---

<div class="bg-gray-100/50 border border-zinc-400/30 dark:bg-neutral-900/50 dark:border-neutral-500/30 px-4 py-4 rounded-xl">
    <span>Now: {now}</span>
</div>
`,
    output: `---
function getDate()
{
  return new Date();
}

const now = getDate();
---

<div
  class="bg-gray-100/50 border border-zinc-400/30 dark:bg-neutral-900/50 dark:border-neutral-500/30 px-4 py-4 rounded-xl"
>
  <span>Now: {now}</span>
</div>
`,
    options: {
      plugins: ['prettier-plugin-astro', 'prettier-plugin-brace-style', thisPlugin],
      ...braceStylePluginOptions,
    },
  },
  {
    name: 'two plugins with some overlapping formatting regions (2) - brace-style -> astro',
    input: `
---
function getDate() {
    return new Date();
}

const now = getDate();
---

<div class="bg-gray-100/50 border border-zinc-400/30 dark:bg-neutral-900/50 dark:border-neutral-500/30 px-4 py-4 rounded-xl">
    <span>Now: {now}</span>
</div>
`,
    output: `---
function getDate()
{
  return new Date();
}

const now = getDate();
---

<div
  class="bg-gray-100/50 border border-zinc-400/30 dark:bg-neutral-900/50 dark:border-neutral-500/30 px-4 py-4 rounded-xl"
>
  <span>Now: {now}</span>
</div>
`,
    options: {
      plugins: ['prettier-plugin-brace-style', 'prettier-plugin-astro', thisPlugin],
      ...braceStylePluginOptions,
    },
  },
  {
    name: 'two plugins with some overlapping formatting regions (3) - astro -> tailwindcss',
    input: `
---
function getDate() {
    return new Date();
}

const now = getDate();
---

<div class="bg-gray-100/50 border border-zinc-400/30 dark:bg-neutral-900/50 dark:border-neutral-500/30 px-4 py-4 rounded-xl">
    <span>Now: {now}</span>
</div>
`,
    output: `---
function getDate() {
  return new Date();
}

const now = getDate();
---

<div
  class="rounded-xl border border-zinc-400/30 bg-gray-100/50 px-4 py-4 dark:border-neutral-500/30 dark:bg-neutral-900/50"
>
  <span>Now: {now}</span>
</div>
`,
    options: {
      plugins: ['prettier-plugin-astro', 'prettier-plugin-tailwindcss', thisPlugin],
    },
  },
  {
    name: 'two plugins with some overlapping formatting regions (4) - tailwindcss -> astro',
    input: `
---
function getDate() {
    return new Date();
}

const now = getDate();
---

<div class="bg-gray-100/50 border border-zinc-400/30 dark:bg-neutral-900/50 dark:border-neutral-500/30 px-4 py-4 rounded-xl">
    <span>Now: {now}</span>
</div>
`,
    output: `---
function getDate() {
  return new Date();
}

const now = getDate();
---

<div
  class="rounded-xl border border-zinc-400/30 bg-gray-100/50 px-4 py-4 dark:border-neutral-500/30 dark:bg-neutral-900/50"
>
  <span>Now: {now}</span>
</div>
`,
    options: {
      plugins: ['prettier-plugin-tailwindcss', 'prettier-plugin-astro', thisPlugin],
    },
  },
  {
    name: 'two plugins with some overlapping formatting regions (5) - astro -> classnames',
    input: `
---
function getDate() {
    return new Date();
}

const now = getDate();
---

<div class="bg-gray-100/50 border border-zinc-400/30 dark:bg-neutral-900/50 dark:border-neutral-500/30 px-4 py-4 rounded-xl">
    <span>Now: {now}</span>
</div>
`,
    output: `---
function getDate() {
  return new Date();
}

const now = getDate();
---

<div
  class="bg-gray-100/50 border border-zinc-400/30 dark:bg-neutral-900/50
dark:border-neutral-500/30 px-4 py-4 rounded-xl"
>
  <span>Now: {now}</span>
</div>
`,
    options: {
      plugins: ['prettier-plugin-astro', 'prettier-plugin-classnames', thisPlugin],
      ...classnamesPluginOptions,
    },
  },
  {
    name: 'two plugins with some overlapping formatting regions (6) - classnames -> astro',
    input: `
---
function getDate() {
    return new Date();
}

const now = getDate();
---

<div class="bg-gray-100/50 border border-zinc-400/30 dark:bg-neutral-900/50 dark:border-neutral-500/30 px-4 py-4 rounded-xl">
    <span>Now: {now}</span>
</div>
`,
    output: `---
function getDate() {
  return new Date();
}

const now = getDate();
---

<div
  class="bg-gray-100/50 border border-zinc-400/30 dark:bg-neutral-900/50
dark:border-neutral-500/30 px-4 py-4 rounded-xl"
>
  <span>Now: {now}</span>
</div>
`,
    options: {
      plugins: ['prettier-plugin-classnames', 'prettier-plugin-astro', thisPlugin],
      ...classnamesPluginOptions,
    },
  },
];

testEach(fixtures, options);
