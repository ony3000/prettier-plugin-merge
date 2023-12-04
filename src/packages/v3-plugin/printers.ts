import { format as formatSync } from '@prettier/sync';
import type { SubstitutePatch } from 'core-parts';
import { makePatches, applyPatches } from 'core-parts';
import type { AstPath, ParserOptions, Doc, Printer, Plugin, Options } from 'prettier';

function sequentialFormattingAndTryMerging(options: ParserOptions, plugins: Plugin[]): string {
  const { originalText } = options;
  const cloneableOptions: Options = {
    ...Object.fromEntries(
      (
        [
          'printWidth',
          'tabWidth',
          'useTabs',
          'semi',
          'singleQuote',
          'jsxSingleQuote',
          'trailingComma',
          'bracketSpacing',
          'bracketSameLine',
          'jsxBracketSameLine',
          'rangeStart',
          'rangeEnd',
          'parser',
          'requirePragma',
          'insertPragma',
          'proseWrap',
          'arrowParens',
          'htmlWhitespaceSensitivity',
          'endOfLine',
          'quoteProps',
          'vueIndentScriptAndStyle',
          'embeddedLanguageFormatting',
          'singleAttributePerLine',
        ] as const
      ).map((key) => [key, options[key]]),
    ),
    plugins: [],
  };

  const firstFormattedText = formatSync(originalText, cloneableOptions);

  /**
   * Changes that may be removed during the sequential formatting process.
   */
  const patches: SubstitutePatch[] = [];

  const sequentiallyMergedText = plugins.reduce((formattedPrevText, plugin) => {
    // @ts-ignore
    const pluginName: string | undefined = plugin.name;

    if (!pluginName) {
      return formattedPrevText;
    }

    const temporaryFormattedText = formatSync(formattedPrevText, {
      ...cloneableOptions,
      plugins: [pluginName],
    });

    const temporaryFormattedTextWithoutPlugin = formatSync(
      temporaryFormattedText,
      cloneableOptions,
    );

    patches.push(...makePatches(temporaryFormattedTextWithoutPlugin, temporaryFormattedText));

    if (patches.length === 0) {
      return temporaryFormattedText;
    }

    return applyPatches(temporaryFormattedTextWithoutPlugin, patches);
  }, firstFormattedText);

  return sequentiallyMergedText
}

function createPrinter(): Printer {
  function main(
    path: AstPath,
    options: ParserOptions,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    print: (path: AstPath) => Doc,
  ): Doc {
    const plugins = options.plugins.filter((plugin) => typeof plugin !== 'string') as Plugin[];
    const parserName = options.parser as string;
    // @ts-ignore
    const comments = options[Symbol.for('comments')];

    if (comments) {
      comments.forEach((comment: any) => {
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

    return sequentialFormattingAndTryMerging(options, parserImplementedPlugins);
  }

  return {
    print: main,
  };
}

export const printers: { [astFormat: string]: Printer } = {
  'merging-ast': createPrinter(),
};
