import { execSync } from 'child_process';
import { resolve, sep } from 'path';

const filePath = resolve(__dirname, './Callout.tsx').split(sep).join('/');

function calculateAverageExecutionTime(trialCount: number, mergePluginName: string): number {
  if (trialCount <= 0) {
    return 0;
  }

  const command = [
    'pnpm prettier --no-config',
    '--parser typescript',
    `--check ${filePath}`,
    '--plugin @trivago/prettier-plugin-sort-imports',
    '--plugin prettier-plugin-tailwindcss',
    '--plugin prettier-plugin-classnames',
    '--plugin prettier-plugin-brace-style',
    `--plugin ${mergePluginName}`,
  ].join(' ');
  let totalExecutionTime = 0;

  for (let index = 0; index < trialCount; index += 1) {
    const startTime = new Date().getTime();
    execSync(command);
    const endTime = new Date().getTime();

    totalExecutionTime += endTime - startTime;
  }

  return totalExecutionTime / trialCount;
}

describe('typescript/performance', () => {
  const trialCount = 5;
  const averageExecutionTimeWithPlugin012 = calculateAverageExecutionTime(trialCount, 'ppm-012');
  const averageExecutionTimeWithPlugin020 = calculateAverageExecutionTime(trialCount, 'ppm-020');
  const averageExecutionTimeWithCurrentPlugin = calculateAverageExecutionTime(trialCount, '.');

  const timeDifferenceWithPlugin020 =
    averageExecutionTimeWithPlugin020 - averageExecutionTimeWithPlugin012;
  const timeDifferenceWithCurrentPlugin =
    averageExecutionTimeWithCurrentPlugin - averageExecutionTimeWithPlugin012;

  test('v0.1.2 is faster than v0.2.0', () => {
    expect(averageExecutionTimeWithPlugin012 < averageExecutionTimeWithPlugin020).toBe(true);
  });

  for (const percent of [10, 20, 30, 40, 50, 60, 70, 80, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99]) {
    test(`The current version reduces the difference between v0.1.2 and v0.2.0 by ${percent}%`, () => {
      const expectedTime = timeDifferenceWithPlugin020 * (1 - percent / 100);

      expect(timeDifferenceWithCurrentPlugin).toBeLessThanOrEqual(expectedTime);
    });
  }
});
