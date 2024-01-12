import { describe, expect, test } from "vitest";
import type { Fixture } from "../settings";
import {
  format,
  mergePlugin,
  sortImportsPlugin,
  braceStylePlugin,
  classnamesPlugin,
  tailwindcssPlugin,
  baseOptions,
} from "../settings";

const sortImportsPluginOptions = {
  importOrder: ["<THIRD_PARTY_MODULES>", "^@[^/]+/(.*)$", "^@/(.*)$", "^[./]"],
  importOrderSeparation: true,
};
const braceStylePluginOptions = {
  braceStyle: "allman",
};
const options = {
  ...baseOptions,
  parser: "vue",
};

const fixtures: Fixture[] = [
  {
    name: "two plugins whose formatting regions are disjoint are commutative #1 (sort-imports -> tailwindcss)",
    input: `
<script setup lang="ts">
import { CounterButton } from './parts'
import { CounterContainer } from '@/layouts'
import { ref } from 'vue'

withDefaults(defineProps<{
  label?: string;
}>(), {
  label: 'Counter',
})

const count = ref(0)
</script>

<template>
  <CounterContainer>
    <span class="px-1">{{ label }}</span>
    <span class="font-bold px-1">{{ count }}</span>
    <CounterButton @click="() => { count += 1 }" />
  </CounterContainer>
</template>
`,
    output: `<script setup lang="ts">
import { ref } from "vue";

import { CounterContainer } from "@/layouts";

import { CounterButton } from "./parts";

withDefaults(
  defineProps<{
    label?: string;
  }>(),
  {
    label: "Counter",
  },
);

const count = ref(0);
</script>

<template>
  <CounterContainer>
    <span class="px-1">{{ label }}</span>
    <span class="px-1 font-bold">{{ count }}</span>
    <CounterButton
      @click="
        () => {
          count += 1;
        }
      "
    />
  </CounterContainer>
</template>
`,
    options: {
      plugins: [sortImportsPlugin, tailwindcssPlugin, mergePlugin],
      ...sortImportsPluginOptions,
    },
  },
  {
    name: "two plugins whose formatting regions are disjoint are commutative #2 (tailwindcss -> sort-imports)",
    input: `
<script setup lang="ts">
import { CounterButton } from './parts'
import { CounterContainer } from '@/layouts'
import { ref } from 'vue'

withDefaults(defineProps<{
  label?: string;
}>(), {
  label: 'Counter',
})

const count = ref(0)
</script>

<template>
  <CounterContainer>
    <span class="px-1">{{ label }}</span>
    <span class="font-bold px-1">{{ count }}</span>
    <CounterButton @click="() => { count += 1 }" />
  </CounterContainer>
</template>
`,
    output: `<script setup lang="ts">
import { ref } from "vue";

import { CounterContainer } from "@/layouts";

import { CounterButton } from "./parts";

withDefaults(
  defineProps<{
    label?: string;
  }>(),
  {
    label: "Counter",
  },
);

const count = ref(0);
</script>

<template>
  <CounterContainer>
    <span class="px-1">{{ label }}</span>
    <span class="px-1 font-bold">{{ count }}</span>
    <CounterButton
      @click="
        () => {
          count += 1;
        }
      "
    />
  </CounterContainer>
</template>
`,
    options: {
      plugins: [tailwindcssPlugin, sortImportsPlugin, mergePlugin],
      ...sortImportsPluginOptions,
    },
  },
  {
    name: "two plugins whose formatting regions are disjoint are commutative #3 (sort-imports -> brace-style)",
    input: `
<script setup lang="ts">
import { CounterButton } from './parts'
import { CounterContainer } from '@/layouts'
import { ref } from 'vue'

withDefaults(defineProps<{
  label?: string;
}>(), {
  label: 'Counter',
})

const count = ref(0)
</script>

<template>
  <CounterContainer>
    <span class="px-1">{{ label }}</span>
    <span class="font-bold px-1">{{ count }}</span>
    <CounterButton @click="() => { count += 1 }" />
  </CounterContainer>
</template>
`,
    output: `<script setup lang="ts">
import { ref } from "vue";

import { CounterContainer } from "@/layouts";

import { CounterButton } from "./parts";

withDefaults(
  defineProps<{
    label?: string;
  }>(),
  {
    label: "Counter",
  },
);

const count = ref(0);
</script>

<template>
  <CounterContainer>
    <span class="px-1">{{ label }}</span>
    <span class="font-bold px-1">{{ count }}</span>
    <CounterButton
      @click="
        () =>
        {
          count += 1;
        }
      "
    />
  </CounterContainer>
</template>
`,
    options: {
      plugins: [sortImportsPlugin, braceStylePlugin, mergePlugin],
      ...sortImportsPluginOptions,
      ...braceStylePluginOptions,
    },
  },
  {
    name: "two plugins whose formatting regions are disjoint are commutative #4 (brace-style -> sort-imports)",
    input: `
<script setup lang="ts">
import { CounterButton } from './parts'
import { CounterContainer } from '@/layouts'
import { ref } from 'vue'

withDefaults(defineProps<{
  label?: string;
}>(), {
  label: 'Counter',
})

const count = ref(0)
</script>

<template>
  <CounterContainer>
    <span class="px-1">{{ label }}</span>
    <span class="font-bold px-1">{{ count }}</span>
    <CounterButton @click="() => { count += 1 }" />
  </CounterContainer>
</template>
`,
    output: `<script setup lang="ts">
import { ref } from "vue";

import { CounterContainer } from "@/layouts";

import { CounterButton } from "./parts";

withDefaults(
  defineProps<{
    label?: string;
  }>(),
  {
    label: "Counter",
  },
);

const count = ref(0);
</script>

<template>
  <CounterContainer>
    <span class="px-1">{{ label }}</span>
    <span class="font-bold px-1">{{ count }}</span>
    <CounterButton
      @click="
        () =>
        {
          count += 1;
        }
      "
    />
  </CounterContainer>
</template>
`,
    options: {
      plugins: [braceStylePlugin, sortImportsPlugin, mergePlugin],
      ...braceStylePluginOptions,
      ...sortImportsPluginOptions,
    },
  },
  {
    name: "two plugins whose formatting regions are disjoint are commutative #5 (tailwindcss -> brace-style)",
    input: `
<script setup lang="ts">
import { CounterButton } from './parts'
import { CounterContainer } from '@/layouts'
import { ref } from 'vue'

withDefaults(defineProps<{
  label?: string;
}>(), {
  label: 'Counter',
})

const count = ref(0)
</script>

<template>
  <CounterContainer>
    <span class="px-1">{{ label }}</span>
    <span class="font-bold px-1">{{ count }}</span>
    <CounterButton @click="() => { count += 1 }" />
  </CounterContainer>
</template>
`,
    output: `<script setup lang="ts">
import { CounterButton } from "./parts";
import { CounterContainer } from "@/layouts";
import { ref } from "vue";

withDefaults(
  defineProps<{
    label?: string;
  }>(),
  {
    label: "Counter",
  },
);

const count = ref(0);
</script>

<template>
  <CounterContainer>
    <span class="px-1">{{ label }}</span>
    <span class="px-1 font-bold">{{ count }}</span>
    <CounterButton
      @click="
        () =>
        {
          count += 1;
        }
      "
    />
  </CounterContainer>
</template>
`,
    options: {
      plugins: [tailwindcssPlugin, braceStylePlugin, mergePlugin],
      ...braceStylePluginOptions,
    },
  },
  {
    name: "two plugins whose formatting regions are disjoint are commutative #6 (brace-style -> tailwindcss)",
    input: `
<script setup lang="ts">
import { CounterButton } from './parts'
import { CounterContainer } from '@/layouts'
import { ref } from 'vue'

withDefaults(defineProps<{
  label?: string;
}>(), {
  label: 'Counter',
})

const count = ref(0)
</script>

<template>
  <CounterContainer>
    <span class="px-1">{{ label }}</span>
    <span class="font-bold px-1">{{ count }}</span>
    <CounterButton @click="() => { count += 1 }" />
  </CounterContainer>
</template>
`,
    output: `<script setup lang="ts">
import { CounterButton } from "./parts";
import { CounterContainer } from "@/layouts";
import { ref } from "vue";

withDefaults(
  defineProps<{
    label?: string;
  }>(),
  {
    label: "Counter",
  },
);

const count = ref(0);
</script>

<template>
  <CounterContainer>
    <span class="px-1">{{ label }}</span>
    <span class="px-1 font-bold">{{ count }}</span>
    <CounterButton
      @click="
        () =>
        {
          count += 1;
        }
      "
    />
  </CounterContainer>
</template>
`,
    options: {
      plugins: [braceStylePlugin, tailwindcssPlugin, mergePlugin],
      ...braceStylePluginOptions,
    },
  },
  {
    name: "two plugins whose formatting regions are disjoint are commutative #7 (sort-imports -> classnames)",
    input: `
<script setup lang="ts">
import { CounterButton } from './parts'
import { CounterContainer } from '@/layouts'
import { ref } from 'vue'

const count = ref(0)

function incrementHandler() {
  count.value += 1
}
</script>

<template>
  <div class="bg-gray-100/50 border border-zinc-400/30 dark:bg-neutral-900/50 dark:border-neutral-500/30 px-4 py-4 rounded-xl">
    <slot></slot>
  </div>
</template>
`,
    output: `<script setup lang="ts">
import { ref } from "vue";

import { CounterContainer } from "@/layouts";

import { CounterButton } from "./parts";

const count = ref(0);

function incrementHandler() {
  count.value += 1;
}
</script>

<template>
  <div
    class="bg-gray-100/50 border border-zinc-400/30 dark:bg-neutral-900/50
      dark:border-neutral-500/30 px-4 py-4 rounded-xl"
  >
    <slot></slot>
  </div>
</template>
`,
    options: {
      plugins: [sortImportsPlugin, classnamesPlugin, mergePlugin],
      ...sortImportsPluginOptions,
    },
  },
  {
    name: "two plugins whose formatting regions are disjoint are commutative #8 (classnames -> sort-imports)",
    input: `
<script setup lang="ts">
import { CounterButton } from './parts'
import { CounterContainer } from '@/layouts'
import { ref } from 'vue'

const count = ref(0)

function incrementHandler() {
  count.value += 1
}
</script>

<template>
  <div class="bg-gray-100/50 border border-zinc-400/30 dark:bg-neutral-900/50 dark:border-neutral-500/30 px-4 py-4 rounded-xl">
    <slot></slot>
  </div>
</template>
`,
    output: `<script setup lang="ts">
import { ref } from "vue";

import { CounterContainer } from "@/layouts";

import { CounterButton } from "./parts";

const count = ref(0);

function incrementHandler() {
  count.value += 1;
}
</script>

<template>
  <div
    class="bg-gray-100/50 border border-zinc-400/30 dark:bg-neutral-900/50
      dark:border-neutral-500/30 px-4 py-4 rounded-xl"
  >
    <slot></slot>
  </div>
</template>
`,
    options: {
      plugins: [classnamesPlugin, sortImportsPlugin, mergePlugin],
      ...sortImportsPluginOptions,
    },
  },
  {
    name: "two plugins whose formatting regions are disjoint are commutative #9 (brace-style -> classnames)",
    input: `
<script setup lang="ts">
import { CounterButton } from './parts'
import { CounterContainer } from '@/layouts'
import { ref } from 'vue'

const count = ref(0)

function incrementHandler() {
  count.value += 1
}
</script>

<template>
  <div class="bg-gray-100/50 border border-zinc-400/30 dark:bg-neutral-900/50 dark:border-neutral-500/30 px-4 py-4 rounded-xl">
    <slot></slot>
  </div>
</template>
`,
    output: `<script setup lang="ts">
import { CounterButton } from "./parts";
import { CounterContainer } from "@/layouts";
import { ref } from "vue";

const count = ref(0);

function incrementHandler()
{
  count.value += 1;
}
</script>

<template>
  <div
    class="bg-gray-100/50 border border-zinc-400/30 dark:bg-neutral-900/50
      dark:border-neutral-500/30 px-4 py-4 rounded-xl"
  >
    <slot></slot>
  </div>
</template>
`,
    options: {
      plugins: [braceStylePlugin, classnamesPlugin, mergePlugin],
      ...braceStylePluginOptions,
    },
  },
  {
    name: "two plugins whose formatting regions are disjoint are commutative #10 (classnames -> brace-style)",
    input: `
<script setup lang="ts">
import { CounterButton } from './parts'
import { CounterContainer } from '@/layouts'
import { ref } from 'vue'

const count = ref(0)

function incrementHandler() {
  count.value += 1
}
</script>

<template>
  <div class="bg-gray-100/50 border border-zinc-400/30 dark:bg-neutral-900/50 dark:border-neutral-500/30 px-4 py-4 rounded-xl">
    <slot></slot>
  </div>
</template>
`,
    output: `<script setup lang="ts">
import { CounterButton } from "./parts";
import { CounterContainer } from "@/layouts";
import { ref } from "vue";

const count = ref(0);

function incrementHandler()
{
  count.value += 1;
}
</script>

<template>
  <div
    class="bg-gray-100/50 border border-zinc-400/30 dark:bg-neutral-900/50
      dark:border-neutral-500/30 px-4 py-4 rounded-xl"
  >
    <slot></slot>
  </div>
</template>
`,
    options: {
      plugins: [classnamesPlugin, braceStylePlugin, mergePlugin],
      ...braceStylePluginOptions,
    },
  },
  {
    name: "two plugins with some overlapping formatting regions #1 (tailwindcss -> classnames)",
    input: `
<script setup lang="ts">
import { CounterButton } from './parts'
import { CounterContainer } from '@/layouts'
import { ref } from 'vue'

const count = ref(0)

function incrementHandler() {
  count.value += 1
}
</script>

<template>
  <div class="bg-gray-100/50 border border-zinc-400/30 dark:bg-neutral-900/50 dark:border-neutral-500/30 px-4 py-4 rounded-xl">
    <slot></slot>
  </div>
</template>
`,
    output: `<script setup lang="ts">
import { CounterButton } from "./parts";
import { CounterContainer } from "@/layouts";
import { ref } from "vue";

const count = ref(0);

function incrementHandler() {
  count.value += 1;
}
</script>

<template>
  <div
    class="rounded-xl border border-zinc-400/30 bg-gray-100/50 px-4 py-4
      dark:border-neutral-500/30 dark:bg-neutral-900/50"
  >
    <slot></slot>
  </div>
</template>
`,
    options: {
      plugins: [tailwindcssPlugin, classnamesPlugin, mergePlugin],
    },
  },
  {
    name: "two plugins with some overlapping formatting regions #2 (classnames -> tailwindcss)",
    input: `
<script setup lang="ts">
import { CounterButton } from './parts'
import { CounterContainer } from '@/layouts'
import { ref } from 'vue'

const count = ref(0)

function incrementHandler() {
  count.value += 1
}
</script>

<template>
  <div class="bg-gray-100/50 border border-zinc-400/30 dark:bg-neutral-900/50 dark:border-neutral-500/30 px-4 py-4 rounded-xl">
    <slot></slot>
  </div>
</template>
`,
    output: `<script setup lang="ts">
import { CounterButton } from "./parts";
import { CounterContainer } from "@/layouts";
import { ref } from "vue";

const count = ref(0);

function incrementHandler() {
  count.value += 1;
}
</script>

<template>
  <div
    class="rounded-xl border border-zinc-400/30 bg-gray-100/50 px-4 py-4 dark:border-neutral-500/30 dark:bg-neutral-900/50"
  >
    <slot></slot>
  </div>
</template>
`,
    options: {
      plugins: [classnamesPlugin, tailwindcssPlugin, mergePlugin],
    },
  },
];

describe("vue/multiple-plugin", () => {
  for (const fixture of fixtures) {
    test(fixture.name, async () => {
      expect(
        await format(fixture.input, {
          ...options,
          ...(fixture.options ?? {}),
        }),
      ).toBe(fixture.output);
    });
  }
});
