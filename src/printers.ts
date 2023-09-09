import * as Diff from 'diff';
import type { AstPath, ParserOptions, Doc, Printer, Plugin } from 'prettier';
import { format } from 'prettier';

function sequentialFormattingAndTryMerging(
  options: ParserOptions,
  plugins: Plugin[],
  defaultPlugin: Plugin,
): string {
  const parserName = options.parser as string;
  const { originalText } = options;
  const sequentialFormattingOptions = {
    ...options,
    rangeEnd: Infinity,
  };

  let sequentiallyFormattedText = originalText;
  let sequentiallyMergedText: string | undefined;

  /**
   * Changes that may be removed during the sequential formatting process.
   */
  const patches: string[] = [];

  plugins.forEach((plugin) => {
    sequentiallyFormattedText = format(sequentiallyFormattedText, {
      ...sequentialFormattingOptions,
      plugins: [plugin],
    });

    const temporaryFormattedText = format(sequentiallyMergedText ?? originalText, {
      ...sequentialFormattingOptions,
      plugins: [plugin],
    });

    if (sequentiallyMergedText === undefined) {
      sequentiallyMergedText = temporaryFormattedText;
      return;
    }

    const pluginParser = plugin.parsers?.[parserName];
    const pluginAstFormat = pluginParser?.astFormat;
    const defaultPluginPrinter =
      defaultPlugin.printers?.[defaultPlugin.parsers?.[parserName].astFormat ?? ''];

    const temporaryFormattedTextWithoutPrinter =
      pluginAstFormat && defaultPluginPrinter
        ? format(temporaryFormattedText, {
            ...sequentialFormattingOptions,
            plugins: [
              {
                ...plugin,
                printers: {
                  ...plugin.printers,
                  [pluginAstFormat]: defaultPluginPrinter,
                },
              },
            ],
          })
        : temporaryFormattedText;

    if (temporaryFormattedTextWithoutPrinter !== temporaryFormattedText) {
      patches.push(
        Diff.createPatch(
          'merging-text',
          temporaryFormattedTextWithoutPrinter,
          temporaryFormattedText,
        ),
      );
    }

    if (patches.length === 0) {
      sequentiallyMergedText = temporaryFormattedText;
      return;
    }

    const changes = Diff.diffLines(sequentiallyMergedText, temporaryFormattedText);
    let fuzzFactorSum = 0;

    changes.forEach((change, index) => {
      if ('added' in change && 'removed' in change && change.added && !change.removed) {
        const conjugate = changes[index - 1];

        if (
          'added' in conjugate &&
          'removed' in conjugate &&
          !conjugate.added &&
          conjugate.removed
        ) {
          fuzzFactorSum += Math.max(change.count ?? 0, conjugate.count ?? 0);
        }
      }
    });

    try {
      let patchedText = temporaryFormattedTextWithoutPrinter;

      patches.forEach((patch) => {
        const partialPatchedTextOrNot = Diff.applyPatch(patchedText, patch, {
          fuzzFactor: fuzzFactorSum,
        });

        if (partialPatchedTextOrNot === false) {
          throw new Error('Patch failed.');
        }

        patchedText = partialPatchedTextOrNot;
      });

      sequentiallyMergedText = patchedText;
    } catch (_) {
      // fallback
      sequentiallyMergedText = sequentiallyFormattedText;
    }
  });

  return sequentiallyMergedText ?? sequentiallyFormattedText;
}

function createPrinter(): Printer {
  function main(
    path: AstPath,
    options: ParserOptions,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    print: (path: AstPath) => Doc,
  ): Doc {
    const plugins = options.plugins.filter((plugin) => typeof plugin !== 'string') as Plugin[];
    const defaultPluginCandidate = plugins.find(
      (plugin) => typeof options.parser === 'string' && plugin.parsers?.[options.parser],
    );

    if (!defaultPluginCandidate) {
      throw new Error('A default plugin with the detected parser does not exist.');
    }

    const node = path.getValue();

    if (node?.comments) {
      node.comments.forEach((comment: any) => {
        // eslint-disable-next-line no-param-reassign
        comment.printed = true;
      });
    }

    const pluginIndex = plugins.findIndex(
      (plugin) =>
        Object.values(plugin.parsers ?? {}).every((parser) => parser.astFormat === 'merging-ast') &&
        Object.entries(plugin.printers ?? {}).every(
          ([astFormat, printer]) =>
            astFormat === 'merging-ast' && Object.keys(printer).every((key) => key === 'print'),
        ),
    );

    if (pluginIndex === -1) {
      throw new Error(
        "The structure of this plugin may have changed. If it's not in development, you may need to report an issue.",
      );
    }

    return sequentialFormattingAndTryMerging(
      options,
      plugins.slice(0, pluginIndex),
      defaultPluginCandidate,
    );
  }

  return {
    print: main,
  };
}

export const printers: { [astFormat: string]: Printer } = {
  'merging-ast': createPrinter(),
};
