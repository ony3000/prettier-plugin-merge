import { execSync } from "child_process";
import { resolve, sep } from "path";

const entryPoints = ["babel/Callout.jsx", "typescript/Callout.tsx"];

function testIf(condition: boolean, ...args: Parameters<jest.It>) {
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
    const averageExecutionTimeWithPlugin031 = calculateAverageExecutionTime(
      filePath,
      "ppm-031",
      trialCount,
    );
    const averageExecutionTimeWithCurrentPlugin = calculateAverageExecutionTime(
      filePath,
      "ppm-current",
      trialCount,
    );

    describe(entry, () => {
      let willTestingContinue = true;

      for (const percent of [
        10, 20, 30, 40, 50, 60, 70, 80, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99,
      ]) {
        const expectedExecutionTime =
          averageExecutionTimeWithPlugin031 * (1 - percent / 100);

        testIf(
          willTestingContinue,
          `The current version reduces the average execution time of v0.3.1 by ${percent}%`,
          () => {
            expect(averageExecutionTimeWithCurrentPlugin).toBeLessThanOrEqual(
              expectedExecutionTime,
            );
          },
        );

        if (willTestingContinue) {
          willTestingContinue =
            averageExecutionTimeWithCurrentPlugin <= expectedExecutionTime;
        }
      }
    });
  }
});
