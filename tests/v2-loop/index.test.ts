import { format } from "prettier";
// @ts-ignore
import decoratedMergePlugin from "./adaptors/prettier-plugin-decorated";
// @ts-ignore
import incompleteMergePlugin from "./adaptors/prettier-plugin-incomplete";

const parserNames = ["babel", "typescript"];

for (const parser of parserNames) {
  describe(`[${parser}] loop test`, () => {
    test("print function should only be called once", () => {
      const input = "// Lorem ipsum\n";

      // @ts-ignore
      globalThis.callCount = 0;
      format(input, {
        parser: "babel",
        plugins: [decoratedMergePlugin, incompleteMergePlugin],
      });
      // @ts-ignore
      expect(globalThis.callCount).toBe(1);
    });
  });
}