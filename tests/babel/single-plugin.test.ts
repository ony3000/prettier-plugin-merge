import mergePlugin from '@/index';

import { format, sortImportsPlugin, braceStylePlugin, tailwindcssPlugin } from '../settings';

const sortImportsPluginOptions = {
  importOrder: ['<THIRD_PARTY_MODULES>', '^@[^/]+/(.*)$', '^@/(.*)$', '^[./]'],
  importOrderSeparation: true,
};
const braceStylePluginOptions = {
  braceStyle: 'allman',
};

describe('babel/single-plugin', () => {
  test('counter component #1 (standalone use without merge plugin)', () => {
    const input = `
import { CounterButton } from './parts';
import { CounterContainer } from '@/layouts';
import { useState } from 'react';

export default function Counter({ label = 'Counter', onChange = undefined }) {
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

export default function Counter({ label = "Counter", onChange = undefined }) {
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
      parser: 'babel',
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

export default function Counter({ label = 'Counter', onChange = undefined }) {
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

export default function Counter({ label = "Counter", onChange = undefined }) {
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
      parser: 'babel',
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

export default function Counter({ label = 'Counter', onChange = undefined }) {
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

export default function Counter({ label = "Counter", onChange = undefined })
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
      parser: 'babel',
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

export default function Counter({ label = 'Counter', onChange = undefined }) {
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

export default function Counter({ label = "Counter", onChange = undefined })
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
      parser: 'babel',
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

export default function Counter({ label = 'Counter', onChange = undefined }) {
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

export default function Counter({ label = "Counter", onChange = undefined }) {
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
      parser: 'babel',
      plugins: [tailwindcssPlugin],
    };

    expect(format(input, options)).toBe(output);
  });

  test('counter component #6 (a combination of a single plugin and a merge plugin also has no effect)', () => {
    const input = `
import { CounterButton } from './parts';
import { CounterContainer } from '@/layouts';
import { useState } from 'react';

export default function Counter({ label = 'Counter', onChange = undefined }) {
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

export default function Counter({ label = "Counter", onChange = undefined }) {
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
      parser: 'babel',
      plugins: [tailwindcssPlugin, mergePlugin],
    };

    expect(format(input, options)).toBe(output);
  });

  test('jest.config.js #1 (standalone use without merge plugin)', () => {
    const input = `
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const customJestConfig = {
  // Add more setup options before each test is run
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },

  testEnvironment: 'jest-environment-jsdom',
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
`;
    const output = `const nextJest = require("next/jest");

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const customJestConfig = {
  // Add more setup options before each test is run
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],

  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },

  testEnvironment: "jest-environment-jsdom",
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
`;
    const options = {
      parser: 'babel',
      plugins: [sortImportsPlugin],
      ...sortImportsPluginOptions,
    };

    expect(format(input, options)).toBe(output);
  });

  test('jest.config.js #2 (a combination of a single plugin and a merge plugin also has no effect)', () => {
    const input = `
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const customJestConfig = {
  // Add more setup options before each test is run
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },

  testEnvironment: 'jest-environment-jsdom',
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
`;
    const output = `const nextJest = require("next/jest");

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const customJestConfig = {
  // Add more setup options before each test is run
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],

  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },

  testEnvironment: "jest-environment-jsdom",
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
`;
    const options = {
      parser: 'babel',
      plugins: [sortImportsPlugin, mergePlugin],
      ...sortImportsPluginOptions,
    };

    expect(format(input, options)).toBe(output);
  });

  test('jest.config.js #3 (standalone use without merge plugin)', () => {
    const input = `
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const customJestConfig = {
  // Add more setup options before each test is run
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },

  testEnvironment: 'jest-environment-jsdom',
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
`;
    const output = `const nextJest = require("next/jest");

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const customJestConfig = {
  // Add more setup options before each test is run
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],

  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },

  testEnvironment: "jest-environment-jsdom",
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
`;
    const options = {
      parser: 'babel',
      plugins: [braceStylePlugin],
      ...braceStylePluginOptions,
    };

    expect(format(input, options)).toBe(output);
  });

  test('jest.config.js #4 (a combination of a single plugin and a merge plugin also has no effect)', () => {
    const input = `
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const customJestConfig = {
  // Add more setup options before each test is run
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },

  testEnvironment: 'jest-environment-jsdom',
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
`;
    const output = `const nextJest = require("next/jest");

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const customJestConfig = {
  // Add more setup options before each test is run
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],

  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },

  testEnvironment: "jest-environment-jsdom",
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
`;
    const options = {
      parser: 'babel',
      plugins: [braceStylePlugin, mergePlugin],
      ...braceStylePluginOptions,
    };

    expect(format(input, options)).toBe(output);
  });

  test('jest.config.js #5 (standalone use without merge plugin)', () => {
    const input = `
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const customJestConfig = {
  // Add more setup options before each test is run
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },

  testEnvironment: 'jest-environment-jsdom',
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
`;
    const output = `const nextJest = require("next/jest");

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const customJestConfig = {
  // Add more setup options before each test is run
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],

  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },

  testEnvironment: "jest-environment-jsdom",
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
`;
    const options = {
      parser: 'babel',
      plugins: [tailwindcssPlugin],
    };

    expect(format(input, options)).toBe(output);
  });

  test('jest.config.js #6 (a combination of a single plugin and a merge plugin also has no effect)', () => {
    const input = `
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const customJestConfig = {
  // Add more setup options before each test is run
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },

  testEnvironment: 'jest-environment-jsdom',
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
`;
    const output = `const nextJest = require("next/jest");

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const customJestConfig = {
  // Add more setup options before each test is run
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],

  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },

  testEnvironment: "jest-environment-jsdom",
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
`;
    const options = {
      parser: 'babel',
      plugins: [tailwindcssPlugin, mergePlugin],
    };

    expect(format(input, options)).toBe(output);
  });

  test('jest.setup.js #1 (standalone use without merge plugin)', () => {
    const input = `
// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove \`setupFilesAfterEnv\` from \`jest.config.js\`

// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
`;
    const output = `// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove \`setupFilesAfterEnv\` from \`jest.config.js\`
// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/extend-expect";
`;
    const options = {
      parser: 'babel',
      plugins: [sortImportsPlugin],
      ...sortImportsPluginOptions,
    };

    expect(format(input, options)).toBe(output);
  });

  test('jest.setup.js #2 (a combination of a single plugin and a merge plugin also has no effect)', () => {
    const input = `
// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove \`setupFilesAfterEnv\` from \`jest.config.js\`

// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
`;
    const output = `// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove \`setupFilesAfterEnv\` from \`jest.config.js\`
// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/extend-expect";
`;
    const options = {
      parser: 'babel',
      plugins: [sortImportsPlugin, mergePlugin],
      ...sortImportsPluginOptions,
    };

    expect(format(input, options)).toBe(output);
  });

  test('jest.setup.js #3 (standalone use without merge plugin)', () => {
    const input = `
// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove \`setupFilesAfterEnv\` from \`jest.config.js\`

// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
`;
    const output = `// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove \`setupFilesAfterEnv\` from \`jest.config.js\`

// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/extend-expect";
`;
    const options = {
      parser: 'babel',
      plugins: [braceStylePlugin],
      ...braceStylePluginOptions,
    };

    expect(format(input, options)).toBe(output);
  });

  test('jest.setup.js #4 (a combination of a single plugin and a merge plugin also has no effect)', () => {
    const input = `
// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove \`setupFilesAfterEnv\` from \`jest.config.js\`

// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
`;
    const output = `// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove \`setupFilesAfterEnv\` from \`jest.config.js\`

// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/extend-expect";
`;
    const options = {
      parser: 'babel',
      plugins: [braceStylePlugin, mergePlugin],
      ...braceStylePluginOptions,
    };

    expect(format(input, options)).toBe(output);
  });

  test('jest.setup.js #5 (standalone use without merge plugin)', () => {
    const input = `
// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove \`setupFilesAfterEnv\` from \`jest.config.js\`

// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
`;
    const output = `// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove \`setupFilesAfterEnv\` from \`jest.config.js\`

// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/extend-expect";
`;
    const options = {
      parser: 'babel',
      plugins: [tailwindcssPlugin],
    };

    expect(format(input, options)).toBe(output);
  });

  test('jest.setup.js #6 (a combination of a single plugin and a merge plugin also has no effect)', () => {
    const input = `
// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove \`setupFilesAfterEnv\` from \`jest.config.js\`

// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
`;
    const output = `// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove \`setupFilesAfterEnv\` from \`jest.config.js\`

// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/extend-expect";
`;
    const options = {
      parser: 'babel',
      plugins: [tailwindcssPlugin, mergePlugin],
    };

    expect(format(input, options)).toBe(output);
  });

  test('next.config.js #1 (standalone use without merge plugin)', () => {
    const input = `
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
};

module.exports = nextConfig;
`;
    const output = `/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
};

module.exports = nextConfig;
`;
    const options = {
      parser: 'babel',
      plugins: [sortImportsPlugin],
      ...sortImportsPluginOptions,
    };

    expect(format(input, options)).toBe(output);
  });

  test('next.config.js #2 (a combination of a single plugin and a merge plugin also has no effect)', () => {
    const input = `
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
};

module.exports = nextConfig;
`;
    const output = `/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
};

module.exports = nextConfig;
`;
    const options = {
      parser: 'babel',
      plugins: [sortImportsPlugin, mergePlugin],
      ...sortImportsPluginOptions,
    };

    expect(format(input, options)).toBe(output);
  });

  test('next.config.js #3 (standalone use without merge plugin)', () => {
    const input = `
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
};

module.exports = nextConfig;
`;
    const output = `/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
};

module.exports = nextConfig;
`;
    const options = {
      parser: 'babel',
      plugins: [braceStylePlugin],
      ...braceStylePluginOptions,
    };

    expect(format(input, options)).toBe(output);
  });

  test('next.config.js #4 (a combination of a single plugin and a merge plugin also has no effect)', () => {
    const input = `
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
};

module.exports = nextConfig;
`;
    const output = `/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
};

module.exports = nextConfig;
`;
    const options = {
      parser: 'babel',
      plugins: [braceStylePlugin, mergePlugin],
      ...braceStylePluginOptions,
    };

    expect(format(input, options)).toBe(output);
  });

  test('next.config.js #5 (standalone use without merge plugin)', () => {
    const input = `
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
};

module.exports = nextConfig;
`;
    const output = `/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
};

module.exports = nextConfig;
`;
    const options = {
      parser: 'babel',
      plugins: [tailwindcssPlugin],
    };

    expect(format(input, options)).toBe(output);
  });

  test('next.config.js #6 (a combination of a single plugin and a merge plugin also has no effect)', () => {
    const input = `
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
};

module.exports = nextConfig;
`;
    const output = `/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
};

module.exports = nextConfig;
`;
    const options = {
      parser: 'babel',
      plugins: [tailwindcssPlugin, mergePlugin],
    };

    expect(format(input, options)).toBe(output);
  });
});
