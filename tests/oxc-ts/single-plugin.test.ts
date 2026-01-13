import {
  thisPlugin,
  noopPlugin,
  braceStylePluginOptions,
  classnamesPluginOptions,
  testEach,
} from '../adaptor';
import type { Fixture } from '../settings';
import { baseOptions } from '../settings';

const options = {
  ...baseOptions,
  parser: 'oxc-ts',
};

const fixtures: Fixture[] = [
  {
    name: 'brace-style plugin (1) - standalone use',
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
      <span className="font-bold px-1">{count}</span>
      <CounterButton onClick={incrementHandler} />
    </CounterContainer>
  );
}
`,
    options: {
      plugins: ['@prettier/plugin-oxc', 'prettier-plugin-brace-style'],
      ...braceStylePluginOptions,
    },
  },
  {
    name: 'brace-style plugin (2) - a combination of a single plugin and a merge plugin also has no effect',
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
      <span className="font-bold px-1">{count}</span>
      <CounterButton onClick={incrementHandler} />
    </CounterContainer>
  );
}
`,
    options: {
      plugins: ['@prettier/plugin-oxc', 'prettier-plugin-brace-style', thisPlugin],
      ...braceStylePluginOptions,
    },
  },
  {
    name: 'tailwindcss plugin (1) - standalone use',
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

export default function Counter({ label = "Counter", onChange = undefined }) {
  const [count, setCount] = useState(0);

  const incrementHandler = () => {
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
      plugins: ['@prettier/plugin-oxc', 'prettier-plugin-tailwindcss'],
    },
  },
  {
    name: 'tailwindcss plugin (2) - a combination of a single plugin and a merge plugin also has no effect',
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

export default function Counter({ label = "Counter", onChange = undefined }) {
  const [count, setCount] = useState(0);

  const incrementHandler = () => {
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
      plugins: ['@prettier/plugin-oxc', 'prettier-plugin-tailwindcss', thisPlugin],
    },
  },
  {
    name: 'classnames plugin (1) - standalone use',
    input: `
export function Callout({ children }) {
  return (
    <div className="bg-gray-100/50 border border-zinc-400/30 dark:bg-neutral-900/50 dark:border-neutral-500/30 px-4 py-4 rounded-xl">
      {children}
    </div>
  );
}
`,
    output: `export function Callout({ children }) {
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
      plugins: ['@prettier/plugin-oxc', 'prettier-plugin-classnames'],
      ...classnamesPluginOptions,
    },
  },
  {
    name: 'classnames plugin (2) - a combination of a single plugin and a merge plugin also has no effect',
    input: `
export function Callout({ children }) {
  return (
    <div className="bg-gray-100/50 border border-zinc-400/30 dark:bg-neutral-900/50 dark:border-neutral-500/30 px-4 py-4 rounded-xl">
      {children}
    </div>
  );
}
`,
    output: `export function Callout({ children }) {
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
      plugins: ['@prettier/plugin-oxc', 'prettier-plugin-classnames', thisPlugin],
      ...classnamesPluginOptions,
    },
  },
  {
    name: 'issue #15',
    input: `
export function Counter() {
  return <span className="font-bold px-1">{count}</span>;
}
`,
    output: `export function Counter() {
  return <span className="px-1 font-bold">{count}</span>;
}
`,
    options: {
      plugins: ['@prettier/plugin-oxc', require.resolve('prettier-plugin-tailwindcss'), thisPlugin],
    },
  },
  {
    name: 'issue #31 (1) - standalone use',
    input: `
export function Callout({ children }) {
  return null;
}
`,
    output: `export function Callout({ children }) {\r\n  return null;\r\n}\r\n`,
    options: {
      plugins: ['@prettier/plugin-oxc', noopPlugin],
      endOfLine: 'crlf',
    },
  },
  {
    name: 'issue #31 (2) - a combination of a single plugin and a merge plugin also has no effect',
    input: `
export function Callout({ children }) {
  return null;
}
`,
    output: `export function Callout({ children }) {\r\n  return null;\r\n}\r\n`,
    options: {
      plugins: ['@prettier/plugin-oxc', noopPlugin, thisPlugin],
      endOfLine: 'crlf',
    },
  },
  {
    name: 'issue #34 (1) - standalone use',
    input: `
export function $1_$$2_$$$3_$$$$4({ children }) {
  return <div>{children}</div>;
}
`,
    output: `export function $1_$$2_$$$3_$$$$4({ children })
{
  return <div>{children}</div>;
}
`,
    options: {
      plugins: ['@prettier/plugin-oxc', 'prettier-plugin-brace-style'],
      ...braceStylePluginOptions,
    },
  },
  {
    name: 'issue #34 (2) - a combination of a single plugin and a merge plugin also has no effect',
    input: `
export function $1_$$2_$$$3_$$$$4({ children }) {
  return <div>{children}</div>;
}
`,
    output: `export function $1_$$2_$$$3_$$$$4({ children })
{
  return <div>{children}</div>;
}
`,
    options: {
      plugins: ['@prettier/plugin-oxc', 'prettier-plugin-brace-style', thisPlugin],
      ...braceStylePluginOptions,
    },
  },
];

testEach(fixtures, options);
