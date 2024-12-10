import type { SubstitutePatch } from 'core-parts';
import { makePatches, applyPatches } from 'core-parts';
import type { Parser, ParserOptions, Plugin } from 'prettier';
import { format } from 'prettier';
import { parsers as babelParsers } from 'prettier/parser-babel';
import { parsers as htmlParsers } from 'prettier/parser-html';
import { parsers as typescriptParsers } from 'prettier/parser-typescript';

const EOL = '\n';

function formatAsCodeblock(text: string, options: ParserOptions, plugins?: Plugin[]) {
  let codeblockStart = '```';
  const codeblockEnd = '```';

  if (options.parser === 'babel') {
    codeblockStart = '```jsx';
  } else if (options.parser === 'typescript') {
    codeblockStart = '```tsx';
  }

  const formattedCodeblock = format(`${codeblockStart}${EOL}${text}${EOL}${codeblockEnd}`, {
    ...options,
    plugins: plugins ?? [],
    rangeEnd: Infinity,
    endOfLine: 'lf',
    parser: options.parentParser,
    parentParser: undefined,
  });
  const formattedText = formattedCodeblock
    .trim()
    .slice(`${codeblockStart}${EOL}`.length, -`${EOL}${codeblockEnd}`.length);

  return formattedText;
}

function sequentialFormattingAndTryMerging(
  options: ParserOptions,
  plugins: Plugin[],
  languageImplementedPlugin?: Plugin,
): string {
  const customLanguageSupportedPlugins = languageImplementedPlugin
    ? [languageImplementedPlugin]
    : [];

  const { originalText } = options;
  const sequentialFormattingOptions = {
    ...options,
    rangeEnd: Infinity,
    endOfLine: 'lf' as const,
    plugins: customLanguageSupportedPlugins,
  };

  const firstFormattedText =
    options.parentParser === 'markdown' || options.parentParser === 'mdx'
      ? formatAsCodeblock(originalText, options)
      : format(originalText, sequentialFormattingOptions);

  /**
   * Changes that may be removed during the sequential formatting process.
   */
  const patches: SubstitutePatch[] = [];

  const sequentiallyMergedText = plugins.reduce((formattedPrevText, plugin) => {
    const temporaryFormattedText =
      options.parentParser === 'markdown' || options.parentParser === 'mdx'
        ? formatAsCodeblock(formattedPrevText, sequentialFormattingOptions, [
            ...customLanguageSupportedPlugins,
            plugin,
          ])
        : format(formattedPrevText, {
            ...sequentialFormattingOptions,
            plugins: [...customLanguageSupportedPlugins, plugin],
          });

    const temporaryFormattedTextWithoutPlugin =
      options.parentParser === 'markdown' || options.parentParser === 'mdx'
        ? formatAsCodeblock(temporaryFormattedText, sequentialFormattingOptions)
        : format(temporaryFormattedText, sequentialFormattingOptions);

    patches.push(...makePatches(temporaryFormattedTextWithoutPlugin, temporaryFormattedText));

    if (patches.length === 0) {
      return temporaryFormattedText;
    }

    return applyPatches(temporaryFormattedTextWithoutPlugin, patches);
  }, firstFormattedText);

  return sequentiallyMergedText;
}

function transformParser(
  parserName: SupportedParserNames,
  defaultParser: Parser,
  languageName?: string,
): Parser {
  return {
    ...defaultParser,
    parse: (
      text: string,
      parsers: { [parserName: string]: Parser },
      options: ParserOptions,
    ): FormattedTextAST => {
      const plugins = options.plugins.filter((plugin) => typeof plugin !== 'string') as Plugin[];
      const pluginIndex = plugins.findIndex(
        (plugin) =>
          Object.values(plugin.parsers ?? {}).every(
            (parser) => parser.astFormat === 'merging-ast',
          ) &&
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

      let languageImplementedPlugin: Plugin | undefined;
      if (languageName) {
        languageImplementedPlugin = plugins
          .slice(0, pluginIndex)
          .filter((plugin) => plugin.languages?.some((language) => language.name === languageName))
          .at(0);

        if (!languageImplementedPlugin) {
          throw new Error(
            `There doesn't seem to be any plugin that supports ${languageName} formatting.`,
          );
        }
      }

      const parserImplementedPlugins = plugins
        .slice(0, pluginIndex)
        .filter((plugin) => plugin.parsers?.[parserName]);
      const result = sequentialFormattingAndTryMerging(
        {
          ...options,
          originalText: text,
        },
        parserImplementedPlugins,
        languageImplementedPlugin,
      );

      return {
        type: 'FormattedText',
        body: result,
      };
    },
    astFormat: 'merging-ast',
  };
}

export const parsers: { [parserName: string]: Parser } = {
  babel: transformParser('babel', babelParsers.babel),
  typescript: transformParser('typescript', typescriptParsers.typescript),
  angular: transformParser('angular', htmlParsers.angular),
  html: transformParser('html', htmlParsers.html),
  vue: transformParser('vue', htmlParsers.vue),
  astro: transformParser('astro', {} as Parser, 'astro'),
  svelte: transformParser('svelte', {} as Parser, 'svelte'),
};
