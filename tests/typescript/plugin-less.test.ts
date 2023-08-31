import mergePlugin from '@/index';

import { format } from '../settings';

describe('typescript/plugin-less', () => {
  test('counter component #1 (no plugin)', () => {
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
      <span className="font-bold px-1">{count}</span>
      <CounterButton onClick={incrementHandler} />
    </CounterContainer>
  );
}
`;
    const options = {
      parser: 'typescript',
      plugins: [],
    };

    expect(format(input, options)).toBe(output);
  });

  test('counter component #2 (merge plugin alone has no effect)', () => {
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
      <span className="font-bold px-1">{count}</span>
      <CounterButton onClick={incrementHandler} />
    </CounterContainer>
  );
}
`;
    const options = {
      parser: 'typescript',
      plugins: [mergePlugin],
    };

    expect(format(input, options)).toBe(output);
  });

  test('next-env.d.ts #1 (no plugin)', () => {
    const input = `
/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.
`;
    const output = `/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.
`;
    const options = {
      parser: 'typescript',
      plugins: [],
    };

    expect(format(input, options)).toBe(output);
  });

  test('next-env.d.ts #2 (merge plugin alone has no effect)', () => {
    const input = `
/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.
`;
    const output = `/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.
`;
    const options = {
      parser: 'typescript',
      plugins: [mergePlugin],
    };

    expect(format(input, options)).toBe(output);
  });

  test('Next.js API route #1 (no plugin)', () => {
    const input = `
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  name: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  res.status(200).json({ name: 'John Doe' });
}
`;
    const output = `// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ name: "John Doe" });
}
`;
    const options = {
      parser: 'typescript',
      plugins: [],
    };

    expect(format(input, options)).toBe(output);
  });

  test('Next.js API route #2 (merge plugin alone has no effect)', () => {
    const input = `
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  name: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  res.status(200).json({ name: 'John Doe' });
}
`;
    const output = `// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ name: "John Doe" });
}
`;
    const options = {
      parser: 'typescript',
      plugins: [mergePlugin],
    };

    expect(format(input, options)).toBe(output);
  });
});
