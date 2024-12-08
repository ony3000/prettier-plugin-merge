import type { Fixture } from 'test-settings';
import { baseOptions } from 'test-settings';

import { testSnapshotEach } from '../adaptor';

const options = {
  ...baseOptions,
  parser: 'markdown',
};

const fixtures: Omit<Fixture, 'output'>[] = [
  {
    name: "(1) This plugin doesn't support markdown parser, so it leaves the output of each plugin as is.",
    input: `
\`\`\`jsx
export function Foo({ children }) {
  return (
    <div className="lorem ipsum dolor sit amet consectetur adipiscing elit proin ex massa hendrerit eu posuere eu volutpat id neque pellentesque">
      {children}
    </div>
  );
}
\`\`\`
`,
    options: {
      plugins: ['prettier-plugin-classnames'],
    },
  },
];

testSnapshotEach(fixtures, options);
