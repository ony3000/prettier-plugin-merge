import mergePlugin from '@/index';

import { format, sortImportsPlugin, braceStylePlugin, tailwindcssPlugin } from '../settings';

const sortImportsPluginOptions = {
  importOrder: ['<THIRD_PARTY_MODULES>', '^@[^/]+/(.*)$', '^@/(.*)$', '^[./]'],
  importOrderSeparation: true,
};
const braceStylePluginOptions = {
  braceStyle: 'allman',
};

describe('typescript/single-plugin', () => {
  test('counter component #1 (standalone use without merge plugin)', () => {
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
      plugins: [sortImportsPlugin],
      ...sortImportsPluginOptions,
    };

    expect(format(input, options)).toBe(output);
  });

  test('counter component #2 (a combination of a single plugin and a merge plugin also has no effect)', () => {
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
      plugins: [sortImportsPlugin, mergePlugin],
      ...sortImportsPluginOptions,
    };

    expect(format(input, options)).toBe(output);
  });

  test('counter component #3 (standalone use without merge plugin)', () => {
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
      <span className="font-bold px-1">{count}</span>
      <CounterButton onClick={incrementHandler} />
    </CounterContainer>
  );
}
`;
    const options = {
      parser: 'typescript',
      plugins: [braceStylePlugin],
      ...braceStylePluginOptions,
    };

    expect(format(input, options)).toBe(output);
  });

  test('counter component #4 (a combination of a single plugin and a merge plugin also has no effect)', () => {
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
      <span className="font-bold px-1">{count}</span>
      <CounterButton onClick={incrementHandler} />
    </CounterContainer>
  );
}
`;
    const options = {
      parser: 'typescript',
      plugins: [braceStylePlugin, mergePlugin],
      ...braceStylePluginOptions,
    };

    expect(format(input, options)).toBe(output);
  });

  test('counter component #5 (standalone use without merge plugin)', () => {
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
      plugins: [tailwindcssPlugin],
    };

    expect(format(input, options)).toBe(output);
  });

  test('counter component #6 (a combination of a single plugin and a merge plugin also has no effect)', () => {
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
      plugins: [tailwindcssPlugin, mergePlugin],
    };

    expect(format(input, options)).toBe(output);
  });

  test('next-env.d.ts #1 (standalone use without merge plugin)', () => {
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
      plugins: [sortImportsPlugin],
      ...sortImportsPluginOptions,
    };

    expect(format(input, options)).toBe(output);
  });

  test('next-env.d.ts #2 (a combination of a single plugin and a merge plugin also has no effect)', () => {
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
      plugins: [sortImportsPlugin, mergePlugin],
      ...sortImportsPluginOptions,
    };

    expect(format(input, options)).toBe(output);
  });

  test('next-env.d.ts #3 (standalone use without merge plugin)', () => {
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
      plugins: [braceStylePlugin],
      ...braceStylePluginOptions,
    };

    expect(format(input, options)).toBe(output);
  });

  test('next-env.d.ts #4 (a combination of a single plugin and a merge plugin also has no effect)', () => {
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
      plugins: [braceStylePlugin, mergePlugin],
      ...braceStylePluginOptions,
    };

    expect(format(input, options)).toBe(output);
  });

  test('next-env.d.ts #5 (standalone use without merge plugin)', () => {
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
      plugins: [tailwindcssPlugin],
    };

    expect(format(input, options)).toBe(output);
  });

  test('next-env.d.ts #6 (a combination of a single plugin and a merge plugin also has no effect)', () => {
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
      plugins: [tailwindcssPlugin, mergePlugin],
    };

    expect(format(input, options)).toBe(output);
  });

  test('Next.js API route #1 (standalone use without merge plugin)', () => {
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
      plugins: [sortImportsPlugin],
      ...sortImportsPluginOptions,
    };

    expect(format(input, options)).toBe(output);
  });

  test('Next.js API route #2 (a combination of a single plugin and a merge plugin also has no effect)', () => {
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
      plugins: [sortImportsPlugin, mergePlugin],
      ...sortImportsPluginOptions,
    };

    expect(format(input, options)).toBe(output);
  });

  test('Next.js API route #3 (standalone use without merge plugin)', () => {
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
)
{
  res.status(200).json({ name: "John Doe" });
}
`;
    const options = {
      parser: 'typescript',
      plugins: [braceStylePlugin],
      ...braceStylePluginOptions,
    };

    expect(format(input, options)).toBe(output);
  });

  test('Next.js API route #4 (a combination of a single plugin and a merge plugin also has no effect)', () => {
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
)
{
  res.status(200).json({ name: "John Doe" });
}
`;
    const options = {
      parser: 'typescript',
      plugins: [braceStylePlugin, mergePlugin],
      ...braceStylePluginOptions,
    };

    expect(format(input, options)).toBe(output);
  });

  test('Next.js API route #5 (standalone use without merge plugin)', () => {
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
      plugins: [tailwindcssPlugin],
    };

    expect(format(input, options)).toBe(output);
  });

  test('Next.js API route #6 (a combination of a single plugin and a merge plugin also has no effect)', () => {
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
      plugins: [tailwindcssPlugin, mergePlugin],
    };

    expect(format(input, options)).toBe(output);
  });
});
