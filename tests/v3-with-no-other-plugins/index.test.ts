import { execSync } from "child_process";
import { resolve, sep } from "path";
import { describe, expect, test } from "vitest";

const entryPoints = [
  "babel/Counter.jsx",
  "babel/jest.config.js",
  "babel/jest.setup.js",
  "babel/next.config.js",
  "typescript/Counter.tsx",
  "typescript/next-env.d.ts",
  "typescript/hello.ts",
  "vue/Counter.vue",
];

describe("prettier v3 test with no other plugins", () => {
  for (const entry of entryPoints) {
    const filePath = resolve(__dirname, entry).split(sep).join("/");
    const command = `pnpm prettier --check ${filePath}`;

    test(entry, () => {
      let isFormatted = true;

      try {
        execSync(command);
      } catch (error) {
        isFormatted = false;
      }

      expect(isFormatted).toBe(true);
    });
  }
});
