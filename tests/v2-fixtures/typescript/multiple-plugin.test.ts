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
  parser: "typescript",
};

const fixtures: Fixture[] = [
  {
    name: "two plugins whose formatting regions are disjoint are commutative #1 (sort-imports -> tailwindcss)",
    input: `
import { CounterButton } from './parts';
import { CounterContainer } from '@/layouts';
import { useState } from 'react';

type CounterProps = {
  label?: string;
  onChange?: (newCount: number) => void;
};

export default function Counter({ label = 'Counter', onChange = undefined }: CounterProps) {
  const [count, setCount] = useState(0);

  const incrementHandler = () => {
    setCount((prevCount) => prevCount + 1);
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
    output: `import { useState } from "react";

import { CounterContainer } from "@/layouts";

import { CounterButton } from "./parts";

type CounterProps = {
  label?: string;
  onChange?: (newCount: number) => void;
};

export default function Counter({
  label = "Counter",
  onChange = undefined,
}: CounterProps) {
  const [count, setCount] = useState(0);

  const incrementHandler = () => {
    setCount((prevCount) => prevCount + 1);
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
      plugins: [sortImportsPlugin, tailwindcssPlugin, mergePlugin],
      ...sortImportsPluginOptions,
    },
  },
  {
    name: "two plugins whose formatting regions are disjoint are commutative #2 (tailwindcss -> sort-imports)",
    input: `
import { CounterButton } from './parts';
import { CounterContainer } from '@/layouts';
import { useState } from 'react';

type CounterProps = {
  label?: string;
  onChange?: (newCount: number) => void;
};

export default function Counter({ label = 'Counter', onChange = undefined }: CounterProps) {
  const [count, setCount] = useState(0);

  const incrementHandler = () => {
    setCount((prevCount) => prevCount + 1);
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
    output: `import { useState } from "react";

import { CounterContainer } from "@/layouts";

import { CounterButton } from "./parts";

type CounterProps = {
  label?: string;
  onChange?: (newCount: number) => void;
};

export default function Counter({
  label = "Counter",
  onChange = undefined,
}: CounterProps) {
  const [count, setCount] = useState(0);

  const incrementHandler = () => {
    setCount((prevCount) => prevCount + 1);
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
      plugins: [tailwindcssPlugin, sortImportsPlugin, mergePlugin],
      ...sortImportsPluginOptions,
    },
  },
  {
    name: "two plugins whose formatting regions are disjoint are commutative #3 (sort-imports -> brace-style)",
    input: `
import { CounterButton } from './parts';
import { CounterContainer } from '@/layouts';
import { useState } from 'react';

type CounterProps = {
  label?: string;
  onChange?: (newCount: number) => void;
};

export default function Counter({ label = 'Counter', onChange = undefined }: CounterProps) {
  const [count, setCount] = useState(0);

  const incrementHandler = () => {
    setCount((prevCount) => prevCount + 1);
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
    output: `import { useState } from "react";

import { CounterContainer } from "@/layouts";

import { CounterButton } from "./parts";

type CounterProps = {
  label?: string;
  onChange?: (newCount: number) => void;
};

export default function Counter({
  label = "Counter",
  onChange = undefined,
}: CounterProps)
{
  const [count, setCount] = useState(0);

  const incrementHandler = () =>
  {
    setCount((prevCount) => prevCount + 1);
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
    options: {
      plugins: [sortImportsPlugin, braceStylePlugin, mergePlugin],
      ...sortImportsPluginOptions,
      ...braceStylePluginOptions,
    },
  },
  {
    name: "two plugins whose formatting regions are disjoint are commutative #4 (brace-style -> sort-imports)",
    input: `
import { CounterButton } from './parts';
import { CounterContainer } from '@/layouts';
import { useState } from 'react';

type CounterProps = {
  label?: string;
  onChange?: (newCount: number) => void;
};

export default function Counter({ label = 'Counter', onChange = undefined }: CounterProps) {
  const [count, setCount] = useState(0);

  const incrementHandler = () => {
    setCount((prevCount) => prevCount + 1);
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
    output: `import { useState } from "react";

import { CounterContainer } from "@/layouts";

import { CounterButton } from "./parts";

type CounterProps = {
  label?: string;
  onChange?: (newCount: number) => void;
};

export default function Counter({
  label = "Counter",
  onChange = undefined,
}: CounterProps)
{
  const [count, setCount] = useState(0);

  const incrementHandler = () =>
  {
    setCount((prevCount) => prevCount + 1);
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
    options: {
      plugins: [braceStylePlugin, sortImportsPlugin, mergePlugin],
      ...braceStylePluginOptions,
      ...sortImportsPluginOptions,
    },
  },
  {
    name: "two plugins whose formatting regions are disjoint are commutative #5 (tailwindcss -> brace-style)",
    input: `
import { CounterButton } from './parts';
import { CounterContainer } from '@/layouts';
import { useState } from 'react';

type CounterProps = {
  label?: string;
  onChange?: (newCount: number) => void;
};

export default function Counter({ label = 'Counter', onChange = undefined }: CounterProps) {
  const [count, setCount] = useState(0);

  const incrementHandler = () => {
    setCount((prevCount) => prevCount + 1);
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

type CounterProps = {
  label?: string;
  onChange?: (newCount: number) => void;
};

export default function Counter({
  label = "Counter",
  onChange = undefined,
}: CounterProps)
{
  const [count, setCount] = useState(0);

  const incrementHandler = () =>
  {
    setCount((prevCount) => prevCount + 1);
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
      plugins: [tailwindcssPlugin, braceStylePlugin, mergePlugin],
      ...braceStylePluginOptions,
    },
  },
  {
    name: "two plugins whose formatting regions are disjoint are commutative #6 (brace-style -> tailwindcss)",
    input: `
import { CounterButton } from './parts';
import { CounterContainer } from '@/layouts';
import { useState } from 'react';

type CounterProps = {
  label?: string;
  onChange?: (newCount: number) => void;
};

export default function Counter({ label = 'Counter', onChange = undefined }: CounterProps) {
  const [count, setCount] = useState(0);

  const incrementHandler = () => {
    setCount((prevCount) => prevCount + 1);
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

type CounterProps = {
  label?: string;
  onChange?: (newCount: number) => void;
};

export default function Counter({
  label = "Counter",
  onChange = undefined,
}: CounterProps)
{
  const [count, setCount] = useState(0);

  const incrementHandler = () =>
  {
    setCount((prevCount) => prevCount + 1);
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
      plugins: [braceStylePlugin, tailwindcssPlugin, mergePlugin],
      ...braceStylePluginOptions,
    },
  },
  {
    name: "two plugins whose formatting regions are disjoint are commutative #7 (sort-imports -> classnames)",
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
    output: `import { useState } from "react";

import { CounterContainer } from "@/layouts";

import { CounterButton } from "./parts";

export function Callout({ children }) {
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
      plugins: [sortImportsPlugin, classnamesPlugin, mergePlugin],
      ...sortImportsPluginOptions,
    },
  },
  {
    name: "two plugins whose formatting regions are disjoint are commutative #8 (classnames -> sort-imports)",
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
    output: `import { useState } from "react";

import { CounterContainer } from "@/layouts";

import { CounterButton } from "./parts";

export function Callout({ children }) {
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
      plugins: [classnamesPlugin, sortImportsPlugin, mergePlugin],
      ...sortImportsPluginOptions,
    },
  },
  {
    name: "two plugins whose formatting regions are disjoint are commutative #9 (brace-style -> classnames)",
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
      plugins: [braceStylePlugin, classnamesPlugin, mergePlugin],
      ...braceStylePluginOptions,
    },
  },
  {
    name: "two plugins whose formatting regions are disjoint are commutative #10 (classnames -> brace-style)",
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
      plugins: [classnamesPlugin, braceStylePlugin, mergePlugin],
      ...braceStylePluginOptions,
    },
  },
  {
    name: "two plugins with some overlapping formatting regions #1 (tailwindcss -> classnames)",
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
      plugins: [tailwindcssPlugin, classnamesPlugin, mergePlugin],
    },
  },
  {
    name: "two plugins with some overlapping formatting regions #2 (classnames -> tailwindcss)",
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
      plugins: [classnamesPlugin, tailwindcssPlugin, mergePlugin],
    },
  },
];

describe("typescript/multiple-plugin", () => {
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
