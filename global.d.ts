import * as Diff from 'diff';

declare global {
  namespace Diff {
    export function applyPatch(
      source: string,
      patch: string | Diff.ParsedDiff | [Diff.ParsedDiff],
      options?: Diff.ApplyPatchOptions,
    ): string | false;
  }
}
