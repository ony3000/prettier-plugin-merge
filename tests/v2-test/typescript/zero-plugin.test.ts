import { format } from 'prettier';
import type { Fixture } from 'test-settings';
import { baseOptions } from 'test-settings';
import { describe, expect, test } from 'vitest';

import * as thisPlugin from '@/packages/v2-plugin';

const options = {
  ...baseOptions,
  parser: 'typescript',
};

const fixtures: Fixture[] = [
  {
    name: 'no plugins (1)',
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
      <span className="font-bold px-1">{count}</span>
      <CounterButton onClick={incrementHandler} />
    </CounterContainer>
  );
}
`,
    options: {
      plugins: [],
    },
  },
  {
    name: 'no plugins (2) - merge plugin alone has no effect',
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
      <span className="font-bold px-1">{count}</span>
      <CounterButton onClick={incrementHandler} />
    </CounterContainer>
  );
}
`,
    options: {
      plugins: [thisPlugin],
    },
  },
];

describe('typescript/zero-plugin', () => {
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
