import { testSnapshotEach } from '../adaptor';
import type { Fixture } from '../settings';
import { baseOptions } from '../settings';

const options = {
  ...baseOptions,
  parser: 'mdx',
};

const fixtures: Omit<Fixture, 'output'>[] = [
  {
    name: "(1) This plugin doesn't support mdx parser, so it leaves the output of each plugin as is.",
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
