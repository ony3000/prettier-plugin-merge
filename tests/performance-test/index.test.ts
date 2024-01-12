import { execSync } from "child_process";
import { resolve, sep } from "path";
import type { TestAPI } from 'vitest';
import { describe, expect, test } from 'vitest';

const entryPoints = ["babel/Callout.jsx", "typescript/Callout.tsx"];

function testIf(condition: boolean, ...args: Parameters<TestAPI>) {
  return condition ? test(...args) : test.skip(...args);
}

function calculateAverageExecutionTime(
  filePath: string,
  mergePluginName: string,
  trialCount: number,
): number {
  if (trialCount <= 0) {
    return 0;
  }

  const command = [
    `pnpm prettier --no-config --write ${filePath}`,
    "--plugin @trivago/prettier-plugin-sort-imports",
    "--plugin prettier-plugin-tailwindcss",
    "--plugin prettier-plugin-classnames",
    "--plugin prettier-plugin-brace-style",
    `--plugin ${mergePluginName}`,
  ].join(" ");
  let totalExecutionTime = 0;

  for (let index = 0; index < trialCount; index += 1) {
    const startTime = new Date().getTime();
    execSync(command);
    const endTime = new Date().getTime();

    totalExecutionTime += endTime - startTime;
  }

  return totalExecutionTime / trialCount;
}

describe("performance-test", () => {
  const trialCount = 5;

  for (const entry of entryPoints) {
    const filePath = resolve(__dirname, entry).split(sep).join("/");
    const averageExecutionTimeWithPlugin012 = calculateAverageExecutionTime(
      filePath,
      "ppm-012",
      trialCount,
    );
    const averageExecutionTimeWithPlugin020 = calculateAverageExecutionTime(
      filePath,
      "ppm-020",
      trialCount,
    );
    const averageExecutionTimeWithCurrentPlugin = calculateAverageExecutionTime(
      filePath,
      "prettier-plugin-merge",
      trialCount,
    );

    const timeDifferenceWithPlugin020 =
      averageExecutionTimeWithPlugin020 - averageExecutionTimeWithPlugin012;
    const timeDifferenceWithCurrentPlugin =
      averageExecutionTimeWithCurrentPlugin - averageExecutionTimeWithPlugin012;

    describe(entry, () => {
      test("v0.1.2 is faster than v0.2.0", () => {
        expect(
          averageExecutionTimeWithPlugin012 < averageExecutionTimeWithPlugin020,
        ).toBe(true);
      });

      let willTestingContinue =
        averageExecutionTimeWithPlugin012 < averageExecutionTimeWithPlugin020;

      for (const percent of [
        10, 20, 30, 40, 50, 60, 70, 80, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99,
      ]) {
        const expectedTimeDifference =
          timeDifferenceWithPlugin020 * (1 - percent / 100);

        testIf(
          willTestingContinue,
          `The current version reduces the difference between v0.1.2 and v0.2.0 by ${percent}%`,
          () => {
            expect(timeDifferenceWithCurrentPlugin).toBeLessThanOrEqual(
              expectedTimeDifference,
            );
          },
        );

        if (willTestingContinue) {
          willTestingContinue =
            timeDifferenceWithCurrentPlugin <= expectedTimeDifference;
        }
      }
    });
  }
});
