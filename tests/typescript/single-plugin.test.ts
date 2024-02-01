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
  parser: 'typescript',
};

const fixtures: Fixture[] = [
  {
    name: 'counter component (1) - standalone use without merge plugin',
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
      <span className="font-bold px-1">{count}</span>
      <CounterButton onClick={incrementHandler} />
    </CounterContainer>
  );
}
`,
    options: {
      plugins: ['@trivago/prettier-plugin-sort-imports'],
      ...sortImportsPluginOptions,
    },
  },
  {
    name: 'counter component (2) - a combination of a single plugin and a merge plugin also has no effect',
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
      <span className="font-bold px-1">{count}</span>
      <CounterButton onClick={incrementHandler} />
    </CounterContainer>
  );
}
`,
    options: {
      plugins: ['@trivago/prettier-plugin-sort-imports', 'prettier-plugin-merge'],
      ...sortImportsPluginOptions,
    },
  },
  {
    name: 'counter component (3) - standalone use without merge plugin',
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
      <span className="font-bold px-1">{count}</span>
      <CounterButton onClick={incrementHandler} />
    </CounterContainer>
  );
}
`,
    options: {
      plugins: ['prettier-plugin-brace-style'],
      ...braceStylePluginOptions,
    },
  },
  {
    name: 'counter component (4) - a combination of a single plugin and a merge plugin also has no effect',
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
      <span className="font-bold px-1">{count}</span>
      <CounterButton onClick={incrementHandler} />
    </CounterContainer>
  );
}
`,
    options: {
      plugins: ['prettier-plugin-brace-style', 'prettier-plugin-merge'],
      ...braceStylePluginOptions,
    },
  },
  {
    name: 'counter component (5) - standalone use without merge plugin',
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
      plugins: ['prettier-plugin-tailwindcss'],
    },
  },
  {
    name: 'counter component (6) - a combination of a single plugin and a merge plugin also has no effect',
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
      plugins: ['prettier-plugin-tailwindcss', 'prettier-plugin-merge'],
    },
  },
  {
    name: 'next-env.d.ts (1) - standalone use without merge plugin',
    input: `
/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.
`,
    output: `/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.
`,
    options: {
      plugins: ['@trivago/prettier-plugin-sort-imports'],
      ...sortImportsPluginOptions,
    },
  },
  {
    name: 'next-env.d.ts (2) - a combination of a single plugin and a merge plugin also has no effect',
    input: `
/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.
`,
    output: `/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.
`,
    options: {
      plugins: ['@trivago/prettier-plugin-sort-imports', 'prettier-plugin-merge'],
      ...sortImportsPluginOptions,
    },
  },
  {
    name: 'next-env.d.ts (3) - standalone use without merge plugin',
    input: `
/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.
`,
    output: `/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.
`,
    options: {
      plugins: ['prettier-plugin-brace-style'],
      ...braceStylePluginOptions,
    },
  },
  {
    name: 'next-env.d.ts (4) - a combination of a single plugin and a merge plugin also has no effect',
    input: `
/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.
`,
    output: `/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.
`,
    options: {
      plugins: ['prettier-plugin-brace-style', 'prettier-plugin-merge'],
      ...braceStylePluginOptions,
    },
  },
  {
    name: 'next-env.d.ts (5) - standalone use without merge plugin',
    input: `
/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.
`,
    output: `/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.
`,
    options: {
      plugins: ['prettier-plugin-tailwindcss'],
    },
  },
  {
    name: 'next-env.d.ts (6) - a combination of a single plugin and a merge plugin also has no effect',
    input: `
/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.
`,
    output: `/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.
`,
    options: {
      plugins: ['prettier-plugin-tailwindcss', 'prettier-plugin-merge'],
    },
  },
  {
    name: 'Next.js API route (1) - standalone use without merge plugin',
    input: `
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  name: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  res.status(200).json({ name: 'John Doe' });
}
`,
    output: `// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  res.status(200).json({ name: "John Doe" });
}
`,
    options: {
      plugins: ['@trivago/prettier-plugin-sort-imports'],
      ...sortImportsPluginOptions,
    },
  },
  {
    name: 'Next.js API route (2) - a combination of a single plugin and a merge plugin also has no effect',
    input: `
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  name: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  res.status(200).json({ name: 'John Doe' });
}
`,
    output: `// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  res.status(200).json({ name: "John Doe" });
}
`,
    options: {
      plugins: ['@trivago/prettier-plugin-sort-imports', 'prettier-plugin-merge'],
      ...sortImportsPluginOptions,
    },
  },
  {
    name: 'Next.js API route (3) - standalone use without merge plugin',
    input: `
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  name: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  res.status(200).json({ name: 'John Doe' });
}
`,
    output: `// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
)
{
  res.status(200).json({ name: "John Doe" });
}
`,
    options: {
      plugins: ['prettier-plugin-brace-style'],
      ...braceStylePluginOptions,
    },
  },
  {
    name: 'Next.js API route (4) - a combination of a single plugin and a merge plugin also has no effect',
    input: `
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  name: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  res.status(200).json({ name: 'John Doe' });
}
`,
    output: `// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
)
{
  res.status(200).json({ name: "John Doe" });
}
`,
    options: {
      plugins: ['prettier-plugin-brace-style', 'prettier-plugin-merge'],
      ...braceStylePluginOptions,
    },
  },
  {
    name: 'Next.js API route (5) - standalone use without merge plugin',
    input: `
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  name: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  res.status(200).json({ name: 'John Doe' });
}
`,
    output: `// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  res.status(200).json({ name: "John Doe" });
}
`,
    options: {
      plugins: ['prettier-plugin-tailwindcss'],
    },
  },
  {
    name: 'Next.js API route (6) - a combination of a single plugin and a merge plugin also has no effect',
    input: `
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  name: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  res.status(200).json({ name: 'John Doe' });
}
`,
    output: `// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  res.status(200).json({ name: "John Doe" });
}
`,
    options: {
      plugins: ['prettier-plugin-tailwindcss', 'prettier-plugin-merge'],
    },
  },
];

describe('typescript/single-plugin', () => {
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
