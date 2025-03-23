import type { Fixture } from 'test-settings';
import { baseOptions } from 'test-settings';

import {
  thisPlugin,
  sortImportsPluginOptions,
  braceStylePluginOptions,
  classnamesPluginOptions,
  testEach,
} from '../adaptor';

const options = {
  ...baseOptions,
  parser: 'babel',
};

const fixtures: Fixture[] = [
  {
    name: 'two plugins whose formatting regions are disjoint (1) - sort-imports -> brace-style',
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
    output: `import { useState } from "react";

import { CounterContainer } from "@/layouts";

import { CounterButton } from "./parts";

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
      plugins: ['@trivago/prettier-plugin-sort-imports', 'prettier-plugin-brace-style', thisPlugin],
      ...sortImportsPluginOptions,
      ...braceStylePluginOptions,
    },
  },
  {
    name: 'two plugins whose formatting regions are disjoint (2) - brace-style -> sort-imports',
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
    output: `import { useState } from "react";

import { CounterContainer } from "@/layouts";

import { CounterButton } from "./parts";

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
      plugins: ['prettier-plugin-brace-style', '@trivago/prettier-plugin-sort-imports', thisPlugin],
      ...braceStylePluginOptions,
      ...sortImportsPluginOptions,
    },
  },
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
      plugins: ['prettier-plugin-brace-style', 'prettier-plugin-tailwindcss', thisPlugin],
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
      plugins: ['prettier-plugin-tailwindcss', 'prettier-plugin-brace-style', thisPlugin],
      ...braceStylePluginOptions,
    },
  },
  {
    name: 'two plugins whose formatting regions are disjoint (5) - tailwindcss -> sort-imports',
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
    output: `import { useState } from "react";

import { CounterContainer } from "@/layouts";

import { CounterButton } from "./parts";

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
      plugins: ['prettier-plugin-tailwindcss', '@trivago/prettier-plugin-sort-imports', thisPlugin],
      ...sortImportsPluginOptions,
    },
  },
  {
    name: 'two plugins whose formatting regions are disjoint (6) - sort-imports -> tailwindcss',
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
    output: `import { useState } from "react";

import { CounterContainer } from "@/layouts";

import { CounterButton } from "./parts";

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
      plugins: ['@trivago/prettier-plugin-sort-imports', 'prettier-plugin-tailwindcss', thisPlugin],
      ...sortImportsPluginOptions,
    },
  },
  {
    name: 'two plugins whose formatting regions are disjoint (7) - sort-imports -> classnames',
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
      plugins: ['@trivago/prettier-plugin-sort-imports', 'prettier-plugin-classnames', thisPlugin],
      ...sortImportsPluginOptions,
      ...classnamesPluginOptions,
    },
  },
  {
    name: 'two plugins whose formatting regions are disjoint (8) - classnames -> sort-imports',
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
      plugins: ['prettier-plugin-classnames', '@trivago/prettier-plugin-sort-imports', thisPlugin],
      ...classnamesPluginOptions,
      ...sortImportsPluginOptions,
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
      plugins: ['prettier-plugin-brace-style', 'prettier-plugin-classnames', thisPlugin],
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
      plugins: ['prettier-plugin-classnames', 'prettier-plugin-brace-style', thisPlugin],
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
      plugins: ['prettier-plugin-tailwindcss', 'prettier-plugin-classnames', thisPlugin],
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
      plugins: ['prettier-plugin-classnames', 'prettier-plugin-tailwindcss', thisPlugin],
      ...classnamesPluginOptions,
    },
  },
  {
    name: 'issue #7',
    input: `
import { useState } from "react";

import { classNames } from "@/adaptors";
import { pretendard } from "@/fonts";

export function MyComponent() {
  if (foo) {
    console.log("foo");
  } else {
    console.log("bar");
  }

  return (
    <div>
      <button
        type="button"
        className="rounded-xl border border-zinc-400/30 bg-gray-100/50 px-4 py-4
          dark:border-neutral-500/30 dark:bg-neutral-900/50"
        onClick={() => {}}
      >
        Click me
      </button>
    </div>
  );
}
`,
    output: `import { useState } from "react";

import { classNames } from "@/adaptors";
import { pretendard } from "@/fonts";

export function MyComponent()
{
  if (foo)
  {
    console.log("foo");
  }
  else
  {
    console.log("bar");
  }

  return (
    <div>
      <button
        type="button"
        className="rounded-xl border border-zinc-400/30 bg-gray-100/50 px-4 py-4
          dark:border-neutral-500/30 dark:bg-neutral-900/50"
        onClick={() =>
        {}}
      >
        Click me
      </button>
    </div>
  );
}
`,
    options: {
      plugins: [
        'prettier-plugin-brace-style',
        '@trivago/prettier-plugin-sort-imports',
        'prettier-plugin-tailwindcss',
        'prettier-plugin-classnames',
        thisPlugin,
      ],
      ...braceStylePluginOptions,
      ...sortImportsPluginOptions,
    },
  },
  {
    name: 'issue #34 (1) - two plugins with some overlapping formatting regions (brace-style -> space-before-function-paren)',
    input: String.raw`
const inlineRegexSourcePlugin = {
  name: 'inline-regex-source',
  renderChunk(code) {
    const str = new MagicString(code);
    str.replace(
      /\/((?:[^\n\r[\\\/]|\\.|\[(?:[^\n\r\\\]]|\\.)*\])+)\/\s*\.\s*source\b/g,
      (m, source) => {
        // escape backslashes
        source = source.replace(/\\(.)|\[(?:\\s\\S|\\S\\s)\]/g, (m, g1) => {
          if (g1) {
            // characters like /\n/ can just be kept as "\n" instead of being escaped to "\\n"
            if (/[nrt0/]/.test(g1)) {
              return m;
            }
            if ('\\' === g1) {
              return '\\\\\\\\'; // escape using 4 backslashes
            }
            return '\\\\' + g1;
          } else {
            return '[^]';
          }
        });
        // escape single quotes
        source = source.replace(/'/g, "\\'");
        // wrap source in single quotes
        return "'" + source + "'";
      }
    );
    return toRenderedChunk(str);
  },
};
`,
    output: String.raw`const inlineRegexSourcePlugin = {
  name: 'inline-regex-source',
  renderChunk(code)
  {
    const str = new MagicString(code);
    str.replace(
      /\/((?:[^\n\r[\\\/]|\\.|\[(?:[^\n\r\\\]]|\\.)*\])+)\/\s*\.\s*source\b/g,
      (m, source) =>
      {
        // escape backslashes
        source = source.replace(/\\(.)|\[(?:\\s\\S|\\S\\s)\]/g, (m, g1) =>
        {
          if (g1)
          {
            // characters like /\n/ can just be kept as "\n" instead of being escaped to "\\n"
            if (/[nrt0/]/.test(g1))
            {
              return m;
            }
            if ('\\' === g1)
            {
              return '\\\\\\\\'; // escape using 4 backslashes
            }
            return '\\\\' + g1;
          }
          else
          {
            return '[^]';
          }
        });
        // escape single quotes
        source = source.replace(/'/g, "\\'");
        // wrap source in single quotes
        return "'" + source + "'";
      },
    );
    return toRenderedChunk(str);
  },
};
`,
    options: {
      plugins: [
        'prettier-plugin-brace-style',
        'prettier-plugin-space-before-function-paren',
        thisPlugin,
      ],
      singleQuote: true,
      // @ts-expect-error
      braceStyle: 'allman',
    },
  },
  {
    name: 'issue #34 (2) - two plugins with some overlapping formatting regions (space-before-function-paren -> brace-style)',
    input: String.raw`
const inlineRegexSourcePlugin = {
  name: 'inline-regex-source',
  renderChunk(code) {
    const str = new MagicString(code);
    str.replace(
      /\/((?:[^\n\r[\\\/]|\\.|\[(?:[^\n\r\\\]]|\\.)*\])+)\/\s*\.\s*source\b/g,
      (m, source) => {
        // escape backslashes
        source = source.replace(/\\(.)|\[(?:\\s\\S|\\S\\s)\]/g, (m, g1) => {
          if (g1) {
            // characters like /\n/ can just be kept as "\n" instead of being escaped to "\\n"
            if (/[nrt0/]/.test(g1)) {
              return m;
            }
            if ('\\' === g1) {
              return '\\\\\\\\'; // escape using 4 backslashes
            }
            return '\\\\' + g1;
          } else {
            return '[^]';
          }
        });
        // escape single quotes
        source = source.replace(/'/g, "\\'");
        // wrap source in single quotes
        return "'" + source + "'";
      }
    );
    return toRenderedChunk(str);
  },
};
`,
    output: String.raw`const inlineRegexSourcePlugin = {
  name: 'inline-regex-source',
  renderChunk (code) {
    const str = new MagicString(code);
    str.replace(
      /\/((?:[^\n\r[\\\/]|\\.|\[(?:[^\n\r\\\]]|\\.)*\])+)\/\s*\.\s*source\b/g,
      (m, source) =>
      {
        // escape backslashes
        source = source.replace(/\\(.)|\[(?:\\s\\S|\\S\\s)\]/g, (m, g1) =>
        {
          if (g1)
          {
            // characters like /\n/ can just be kept as "\n" instead of being escaped to "\\n"
            if (/[nrt0/]/.test(g1))
            {
              return m;
            }
            if ('\\' === g1)
            {
              return '\\\\\\\\'; // escape using 4 backslashes
            }
            return '\\\\' + g1;
          }
          else
          {
            return '[^]';
          }
        });
        // escape single quotes
        source = source.replace(/'/g, "\\'");
        // wrap source in single quotes
        return "'" + source + "'";
      },
    );
    return toRenderedChunk(str);
  },
};
`,
    options: {
      plugins: [
        'prettier-plugin-space-before-function-paren',
        'prettier-plugin-brace-style',
        thisPlugin,
      ],
      singleQuote: true,
      // @ts-expect-error
      braceStyle: 'allman',
    },
  },
];

testEach(fixtures, options);
