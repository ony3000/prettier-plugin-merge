import type { Fixture } from 'test-settings';
import { baseOptions } from 'test-settings';

import { thisPlugin, testEach } from '../adaptor';

const options = {
  ...baseOptions,
  parser: 'vue',
};

const fixtures: Fixture[] = [
  {
    name: 'no plugins (1)',
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
        () => {
          count += 1;
        }
      "
    />
  </CounterContainer>
</template>
`,
    options: {
      plugins: [],
    },
  },
  {
    name: 'no plugins (2) - merge plugin alone has no effect',
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
        () => {
          count += 1;
        }
      "
    />
  </CounterContainer>
</template>
`,
    options: {
      plugins: [thisPlugin],
    },
  },
];

testEach(fixtures, options);
