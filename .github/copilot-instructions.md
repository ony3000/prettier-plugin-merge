# Copilot Instructions

## Commands

```bash
pnpm run build       # Bundle with esbuild (minified, outputs to dist/)
pnpm run build:plain # Bundle without minification
pnpm run lint        # Biome linter on src/ and tests/
pnpm run test        # Run all tests with Vitest
```

**Run a single test file:**
```bash
pnpm test tests/babel-ts/multiple-plugin.test.ts
```

**Run tests matching a pattern:**
```bash
pnpm test -t "test name pattern"
```

## Architecture

This is a Prettier plugin that solves Prettier's limitation of only applying the **last** plugin for a given language. It works entirely at the **text/string level** — it never modifies the AST.

**Critical constraint:** `prettier-plugin-merge` must always be the **last** plugin in the `plugins` array. It sequences all preceding plugins and merges their output.

### Execution flow

1. **`src/parsers.ts`** — `transformParser()` wraps each language's default parser. During the parse phase it runs `sequentialFormattingAndTryMerging()`:
   - Format the original text with **no plugins** (baseline)
   - For each preceding plugin in order:
     1. Format text **with** the plugin
     2. Format that result **without** the plugin (to isolate the plugin's changes)
     3. Compute patches via `makePatches()`
     4. Apply accumulated patches via `applyPatches()`
   - Returns the merged text wrapped in a custom AST node: `{ type: 'FormattedText', body: string }`

2. **`src/core-parts/index.ts`** — Diff and merge logic:
   - `makePatches(oldStr, newStr)` — uses `diffLines()` to produce `SubstitutePatch[]` (`{ type: 'keep' | 'change', ... }`)
   - `applyPatches(text, patchesPerPlugin[])` — applies patches sequentially; uses `diffWords()` for conflict detection; skips a patch if the region has shifted, but applies it anyway if changes are only whitespace
   - Two branches marked `// Note: A case study is needed.` handle the case where plugins make conflicting **non-whitespace** changes to the same region. No real-world example triggering these paths has been found yet — they are **not** intentional silent no-ops; a triggering case study is still needed.

3. **`src/printers.ts`** — Minimal pass-through printer for the `merging-ast` format; returns `node.body` directly

4. **`src/index.ts`** — Re-exports `parsers` and `printers`

Supported parsers: `babel`, `babel-ts`, `typescript`, `angular`, `html`, `vue`, `css`, `scss`, `less`, `oxc`, `oxc-ts`, `astro`, `svelte`. Markdown/MDX are explicitly not supported — use Prettier `overrides` to exclude the plugin for those file types.

**External plugin detection:** Parsers without a built-in Prettier default (`oxc`, `oxc-ts`, `astro`, `svelte`) are located at runtime via `plugin.name`. This property exists on Prettier plugin objects at runtime but is absent from Prettier's `Plugin` TypeScript type definition, hence the `@ts-expect-error` at that call site.

**`formatAsCodeblock` (deprecated):** This function in `src/parsers.ts` is `@deprecated` and will be removed at v0.12.0. It is still actively called for the markdown/mdx `parentParser` paths and is kept solely for backward compatibility until then.

## Conventions

### Tests

Tests are **fixture-based** using Vitest. The `Fixture` type (from `tests/settings.ts`):

```ts
type Fixture = {
  name: string;
  input: string;
  output: string;
  options?: Partial<PrettierBaseOptions & { plugins: (string | Plugin)[] }>;
};
```

Each test file passes a `Fixture[]` to one of three helpers from `tests/adaptor.ts`:

| Helper | When to use |
|---|---|
| `testEach(fixtures)` | Known expected output (`output` field populated) |
| `testSnapshotEach(fixtures)` | Output not predetermined; also checks idempotency with ≤1 plugin |
| `testErrorEach(fixtures)` | Fixtures expected to throw |

Tests are organized by parser under `tests/<parser>/` with consistent filenames:
- `zero-plugin.test.ts` — merge plugin present, no other plugins
- `single-plugin.test.ts` — merge plugin + one other plugin
- `multiple-plugin.test.ts` — merge plugin + two or more plugins
- `issue-<N>.test.ts` — regression tests for specific GitHub issues

Pre-configured plugin option objects live in `tests/adaptor.ts`: `braceStylePluginOptions`, `classnamesPluginOptions`, `tailwindcssPluginOptions`, `sortImportsPluginOptions`.

`noopPlugin` (also in `tests/adaptor.ts`) is a diagnostic fixture created to investigate `endOfLine: crlf` bugs by simulating "a plugin that returns Prettier's output as-is". It intentionally covers only the parsers relevant to those investigations (`babel`, `typescript`, `angular`, `html`, `vue`).

### Imports

Use the `@/` path alias to import from `src/`:
```ts
import { makePatches } from '@/core-parts';
```

### TypeScript

Strict mode is on. Targets ES2015 with ESNext modules. `noEmit: true` — TypeScript is type-check only; esbuild handles compilation.

### Linting

Biome runs in **lint-only** mode (formatter disabled; Prettier is the formatter). Recommended rules are enabled.
