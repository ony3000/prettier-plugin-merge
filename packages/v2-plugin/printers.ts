import * as Diff from 'diff';
import type { AstPath, ParserOptions, Doc, Printer, Plugin } from 'prettier';
import { format } from 'prettier';

enum PairingMode {
  EVEN = 'even',
  ODD = 'odd',
}

type SubstitutePatch = {
  from: string;
  to: string;
};

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

  let isFirst = true;
  let sequentiallyMergedText = originalText;

  /**
   * Changes that may be removed during the sequential formatting process.
   */
  const patches: SubstitutePatch[] = [];

  plugins.forEach((plugin) => {
    const temporaryFormattedText = format(sequentiallyMergedText, {
      ...sequentialFormattingOptions,
      plugins: [plugin],
    });

    if (isFirst) {
      sequentiallyMergedText = temporaryFormattedText;
      isFirst = false;
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
      let temporaryText = '';
      let mode: PairingMode = PairingMode.EVEN;

      Diff.diffLines(temporaryFormattedTextWithoutPrinter, temporaryFormattedText)
        .filter((change) => 'added' in change && 'removed' in change)
        .forEach((change) => {
          if (!change.added && change.removed) {
            if (mode === PairingMode.EVEN) {
              temporaryText = change.value;
              mode = PairingMode.ODD;
            } else {
              patches.push({ from: temporaryText, to: '' });
              temporaryText = change.value;
            }
          } else if (change.added && !change.removed) {
            if (mode === PairingMode.EVEN) {
              patches.push({ from: '', to: change.value });
            } else {
              patches.push({ from: temporaryText, to: change.value });
              mode = PairingMode.EVEN;
            }
          }
        });
    }

    if (patches.length === 0) {
      sequentiallyMergedText = temporaryFormattedText;
      return;
    }

    sequentiallyMergedText = patches.reduce(
      (patchedPrevText, { from, to }) => patchedPrevText.replace(from, to),
      temporaryFormattedTextWithoutPrinter,
    );
  });

  return sequentiallyMergedText;
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

    const parserName = options.parser as string;
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

    const parserImplementedPlugins = plugins
      .slice(0, pluginIndex)
      .filter((plugin) => plugin.parsers?.[parserName]);

    return sequentialFormattingAndTryMerging(
      options,
      parserImplementedPlugins,
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
