import { describe, expect, test } from 'vitest';

import type { Fixture } from '../settings';
import { format, baseOptions } from '../settings';

const sortImportsPluginOptions = {
  importOrder: ['<THIRD_PARTY_MODULES>', '^@[^/]+/(.*)$', '^@/(.*)$', '^[./]'],
  importOrderSeparation: true,
};
const braceStylePluginOptions = {
  braceStyle: 'allman',
};
const options = {
  ...baseOptions,
  parser: 'vue',
};

const fixtures: Fixture[] = [
  {
    name: 'counter component (1) - standalone use without merge plugin',
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
        () => {
          count += 1;
        }
      "
    />
  </CounterContainer>
</template>
`,
    options: {
      plugins: ['@trivago/prettier-plugin-sort-imports'],
      ...sortImportsPluginOptions,
    },
  },
  {
    name: 'counter component (2) - a combination of a single plugin and a merge plugin also has no effect',
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
        () => {
          count += 1;
        }
      "
    />
  </CounterContainer>
</template>
`,
    options: {
      plugins: ['@trivago/prettier-plugin-sort-imports', 'prettier-plugin-merge'],
      ...sortImportsPluginOptions,
    },
  },
  {
    name: 'counter component (3) - standalone use without merge plugin',
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
      plugins: ['prettier-plugin-brace-style'],
      ...braceStylePluginOptions,
    },
  },
  {
    name: 'counter component (4) - a combination of a single plugin and a merge plugin also has no effect',
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
      plugins: ['prettier-plugin-brace-style', 'prettier-plugin-merge'],
      ...braceStylePluginOptions,
    },
  },
  {
    name: 'counter component (5) - standalone use without merge plugin',
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
        () => {
          count += 1;
        }
      "
    />
  </CounterContainer>
</template>
`,
    options: {
      plugins: ['prettier-plugin-tailwindcss'],
    },
  },
  {
    name: 'counter component (6) - a combination of a single plugin and a merge plugin also has no effect',
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
        () => {
          count += 1;
        }
      "
    />
  </CounterContainer>
</template>
`,
    options: {
      plugins: ['prettier-plugin-tailwindcss', 'prettier-plugin-merge'],
    },
  },
];

describe('vue/single-plugin', () => {
  for (const fixture of fixtures) {
    test(fixture.name, () => {
      expect(
        format(fixture.input, {
          ...options,
          ...(fixture.options ?? {}),
        }),
      ).toBe(fixture.output);
    });
  }
});
