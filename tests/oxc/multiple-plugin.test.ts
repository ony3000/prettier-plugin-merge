import {
  thisPlugin,
  braceStylePluginOptions,
  classnamesPluginOptions,
  tailwindcssPluginOptions,
  testEach,
} from '../adaptor';
import type { Fixture } from '../settings';
import { baseOptions } from '../settings';

const options = {
  ...baseOptions,
  parser: 'oxc',
};

const fixtures: Fixture[] = [
  {
    name: 'two plugins whose formatting regions are disjoint (3) - brace-style -> tailwindcss',
    input: `
import { CounterButton } from './parts';
import { CounterContainer } from '@/layouts';
import { useState } from 'react';

export default function Counter({
  label = 'Counter',
  onChange = undefined,
}) {
  const [count, setCount] = useState(0);

  const incrementHandler = () => {
    setCount((c) => c + 1);
    onChange?.(count + 1);
  };

  return (
    <CounterContainer>
      <span className="px-1">{label}</span>
      <span className="font-bold px-1">{count}</span>
      <CounterButton onClick={incrementHandler} />
    </CounterContainer>
  );
}
`,
    output: `import { CounterButton } from "./parts";
import { CounterContainer } from "@/layouts";
import { useState } from "react";

export default function Counter({ label = "Counter", onChange = undefined })
{
  const [count, setCount] = useState(0);

  const incrementHandler = () =>
  {
    setCount((c) => c + 1);
    onChange?.(count + 1);
  };

  return (
    <CounterContainer>
      <span className="px-1">{label}</span>
      <span className="px-1 font-bold">{count}</span>
      <CounterButton onClick={incrementHandler} />
    </CounterContainer>
  );
}
`,
    options: {
      plugins: [
        '@prettier/plugin-oxc',
        'prettier-plugin-brace-style',
        'prettier-plugin-tailwindcss',
        thisPlugin,
      ],
      ...braceStylePluginOptions,
    },
  },
  {
    name: 'two plugins whose formatting regions are disjoint (4) - tailwindcss -> brace-style',
    input: `
import { CounterButton } from './parts';
import { CounterContainer } from '@/layouts';
import { useState } from 'react';

export default function Counter({
  label = 'Counter',
  onChange = undefined,
}) {
  const [count, setCount] = useState(0);

  const incrementHandler = () => {
    setCount((c) => c + 1);
    onChange?.(count + 1);
  };

  return (
    <CounterContainer>
      <span className="px-1">{label}</span>
      <span className="font-bold px-1">{count}</span>
      <CounterButton onClick={incrementHandler} />
    </CounterContainer>
  );
}
`,
    output: `import { CounterButton } from "./parts";
import { CounterContainer } from "@/layouts";
import { useState } from "react";

export default function Counter({ label = "Counter", onChange = undefined })
{
  const [count, setCount] = useState(0);

  const incrementHandler = () =>
  {
    setCount((c) => c + 1);
    onChange?.(count + 1);
  };

  return (
    <CounterContainer>
      <span className="px-1">{label}</span>
      <span className="px-1 font-bold">{count}</span>
      <CounterButton onClick={incrementHandler} />
    </CounterContainer>
  );
}
`,
    options: {
      plugins: [
        '@prettier/plugin-oxc',
        'prettier-plugin-tailwindcss',
        'prettier-plugin-brace-style',
        thisPlugin,
      ],
      ...braceStylePluginOptions,
    },
  },
  {
    name: 'two plugins whose formatting regions are disjoint (9) - brace-style -> classnames',
    input: `
import { CounterButton } from './parts';
import { CounterContainer } from '@/layouts';
import { useState } from 'react';

export function Callout({ children }) {
  return (
    <div className="bg-gray-100/50 border border-zinc-400/30 dark:bg-neutral-900/50 dark:border-neutral-500/30 px-4 py-4 rounded-xl">
      {children}
    </div>
  );
}
`,
    output: `import { CounterButton } from "./parts";
import { CounterContainer } from "@/layouts";
import { useState } from "react";

export function Callout({ children })
{
  return (
    <div
      className="bg-gray-100/50 border border-zinc-400/30 dark:bg-neutral-900/50
        dark:border-neutral-500/30 px-4 py-4 rounded-xl"
    >
      {children}
    </div>
  );
}
`,
    options: {
      plugins: [
        '@prettier/plugin-oxc',
        'prettier-plugin-brace-style',
        'prettier-plugin-classnames',
        thisPlugin,
      ],
      ...braceStylePluginOptions,
      ...classnamesPluginOptions,
    },
  },
  {
    name: 'two plugins whose formatting regions are disjoint (10) - classnames -> brace-style',
    input: `
import { CounterButton } from './parts';
import { CounterContainer } from '@/layouts';
import { useState } from 'react';

export function Callout({ children }) {
  return (
    <div className="bg-gray-100/50 border border-zinc-400/30 dark:bg-neutral-900/50 dark:border-neutral-500/30 px-4 py-4 rounded-xl">
      {children}
    </div>
  );
}
`,
    output: `import { CounterButton } from "./parts";
import { CounterContainer } from "@/layouts";
import { useState } from "react";

export function Callout({ children })
{
  return (
    <div
      className="bg-gray-100/50 border border-zinc-400/30 dark:bg-neutral-900/50
        dark:border-neutral-500/30 px-4 py-4 rounded-xl"
    >
      {children}
    </div>
  );
}
`,
    options: {
      plugins: [
        '@prettier/plugin-oxc',
        'prettier-plugin-classnames',
        'prettier-plugin-brace-style',
        thisPlugin,
      ],
      ...classnamesPluginOptions,
      ...braceStylePluginOptions,
    },
  },
  {
    name: 'two plugins with some overlapping formatting regions (1) - tailwindcss -> classnames',
    input: `
import { CounterButton } from './parts';
import { CounterContainer } from '@/layouts';
import { useState } from 'react';

export function Callout({ children }) {
  return (
    <div className="bg-gray-100/50 border border-zinc-400/30 dark:bg-neutral-900/50 dark:border-neutral-500/30 px-4 py-4 rounded-xl">
      {children}
    </div>
  );
}
`,
    output: `import { CounterButton } from "./parts";
import { CounterContainer } from "@/layouts";
import { useState } from "react";

export function Callout({ children }) {
  return (
    <div
      className="rounded-xl border border-zinc-400/30 bg-gray-100/50 px-4 py-4
        dark:border-neutral-500/30 dark:bg-neutral-900/50"
    >
      {children}
    </div>
  );
}
`,
    options: {
      plugins: [
        '@prettier/plugin-oxc',
        'prettier-plugin-tailwindcss',
        'prettier-plugin-classnames',
        thisPlugin,
      ],
      ...classnamesPluginOptions,
    },
  },
  {
    name: 'two plugins with some overlapping formatting regions (2) - classnames -> tailwindcss',
    input: `
import { CounterButton } from './parts';
import { CounterContainer } from '@/layouts';
import { useState } from 'react';

export function Callout({ children }) {
  return (
    <div className="bg-gray-100/50 border border-zinc-400/30 dark:bg-neutral-900/50 dark:border-neutral-500/30 px-4 py-4 rounded-xl">
      {children}
    </div>
  );
}
`,
    output: `import { CounterButton } from "./parts";
import { CounterContainer } from "@/layouts";
import { useState } from "react";

export function Callout({ children }) {
  return (
    <div
      className="rounded-xl border border-zinc-400/30 bg-gray-100/50
        px-4 py-4 dark:border-neutral-500/30 dark:bg-neutral-900/50"
    >
      {children}
    </div>
  );
}
`,
    options: {
      plugins: [
        '@prettier/plugin-oxc',
        'prettier-plugin-classnames',
        'prettier-plugin-tailwindcss',
        thisPlugin,
      ],
      ...classnamesPluginOptions,
      ...tailwindcssPluginOptions,
    },
  },
];

testEach(fixtures, options);
