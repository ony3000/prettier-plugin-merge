import mergePlugin from '@/index';

import { format, sortImportsPlugin, braceStylePlugin, tailwindcssPlugin } from '../settings';

const sortImportsPluginOptions = {
  importOrder: ['<THIRD_PARTY_MODULES>', '^@[^/]+/(.*)$', '^@/(.*)$', '^[./]'],
  importOrderSeparation: true,
};
const braceStylePluginOptions = {
  braceStyle: 'allman',
};

describe('typescript/multiple-plugin', () => {
  test('plugins that do not implement printers have no order constraints #1 (sort-imports -> tailwindcss)', () => {
    const input = `
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
`;
    const output = `import { useState } from "react";

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
`;
    const options = {
      parser: 'typescript',
      plugins: [sortImportsPlugin, tailwindcssPlugin, mergePlugin],
      ...sortImportsPluginOptions,
    };

    expect(format(input, options)).toBe(output);
  });

  test('plugins that do not implement printers have no order constraints #2 (tailwindcss -> sort-imports)', () => {
    const input = `
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
`;
    const output = `import { useState } from "react";

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
`;
    const options = {
      parser: 'typescript',
      plugins: [tailwindcssPlugin, sortImportsPlugin, mergePlugin],
      ...sortImportsPluginOptions,
    };

    expect(format(input, options)).toBe(output);
  });

  test('the plugin implementing the printer may be ignored unless placed immediately before this plugin #1 (sort-imports -> brace-style)', () => {
    const input = `
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
`;
    const output = `import { useState } from "react";

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
`;
    const options = {
      parser: 'typescript',
      plugins: [sortImportsPlugin, braceStylePlugin, mergePlugin],
      ...sortImportsPluginOptions,
      ...braceStylePluginOptions,
    };

    expect(format(input, options)).toBe(output);
  });

  test('the plugin implementing the printer may be ignored unless placed immediately before this plugin #2 (brace-style -> sort-imports) - `brace-style` is ignored', () => {
    const input = `
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
`;
    const output = `import { useState } from "react";

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
      <span className="font-bold px-1">{count}</span>
      <CounterButton onClick={incrementHandler} />
    </CounterContainer>
  );
}
`;
    const options = {
      parser: 'typescript',
      plugins: [braceStylePlugin, sortImportsPlugin, mergePlugin],
      ...braceStylePluginOptions,
      ...sortImportsPluginOptions,
    };

    expect(format(input, options)).toBe(output);
  });

  test('the plugin implementing the printer may be ignored unless placed immediately before this plugin #3 (tailwindcss -> brace-style)', () => {
    const input = `
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
`;
    const output = `import { CounterButton } from "./parts";
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
`;
    const options = {
      parser: 'typescript',
      plugins: [tailwindcssPlugin, braceStylePlugin, mergePlugin],
      ...braceStylePluginOptions,
    };

    expect(format(input, options)).toBe(output);
  });

  test('the plugin implementing the printer may be ignored unless placed immediately before this plugin #4 (brace-style -> tailwindcss) - `brace-style` is ignored', () => {
    const input = `
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
`;
    const output = `import { CounterButton } from "./parts";
import { CounterContainer } from "@/layouts";
import { useState } from "react";

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
`;
    const options = {
      parser: 'typescript',
      plugins: [braceStylePlugin, tailwindcssPlugin, mergePlugin],
      ...braceStylePluginOptions,
    };

    expect(format(input, options)).toBe(output);
  });
});
