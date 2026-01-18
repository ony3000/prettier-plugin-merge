import type { Parser, ParserOptions, Plugin } from 'prettier';
import { format } from 'prettier';
import { parsers as babelParsers } from 'prettier/plugins/babel';
import { parsers as htmlParsers } from 'prettier/plugins/html';
import { parsers as typescriptParsers } from 'prettier/plugins/typescript';

import type { SubstitutePatch } from './core-parts';
import { makePatches, applyPatches } from './core-parts';

const EOL = '\n';

async function formatAsCodeblock(text: string, options: ParserOptions, plugins?: Plugin[]) {
  let codeblockStart = '```';
  const codeblockEnd = '```';

  if (options.parser === 'babel') {
    codeblockStart = '```jsx';
  } else if (options.parser === 'typescript') {
    codeblockStart = '```tsx';
  }

  const formattedCodeblock = await format(`${codeblockStart}${EOL}${text}${EOL}${codeblockEnd}`, {
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

async function sequentialFormattingAndTryMerging(
  options: ParserOptions,
  plugins: Plugin[],
  externalPlugin?: Plugin,
): Promise<string> {
  const externalPlugins = externalPlugin ? [externalPlugin] : [];

  const { originalText } = options;
  const sequentialFormattingOptions = {
    ...options,
    rangeEnd: Infinity,
    endOfLine: 'lf' as const,
    plugins: externalPlugins,
  };

  const firstFormattedTextPromise =
    options.parentParser === 'markdown' || options.parentParser === 'mdx'
      ? formatAsCodeblock(originalText, options)
      : format(originalText, sequentialFormattingOptions);

  /**
   * List of output differences according to the presence or absence of each plugin.
   */
  const patchesPerPlugin: SubstitutePatch[][] = [];

  const sequentiallyMergedText = await plugins.reduce<Promise<string>>(
    async (formattedPrevTextPromise, plugin) => {
      const formattedPrevText = await formattedPrevTextPromise;

      const temporaryFormattedText =
        options.parentParser === 'markdown' || options.parentParser === 'mdx'
          ? await formatAsCodeblock(formattedPrevText, sequentialFormattingOptions, [
              ...externalPlugins,
              plugin,
            ])
          : await format(formattedPrevText, {
              ...sequentialFormattingOptions,
              plugins: [...externalPlugins, plugin],
            });

      const temporaryFormattedTextWithoutPlugin =
        options.parentParser === 'markdown' || options.parentParser === 'mdx'
          ? await formatAsCodeblock(temporaryFormattedText, sequentialFormattingOptions)
          : await format(temporaryFormattedText, sequentialFormattingOptions);

      patchesPerPlugin.push(
        makePatches(temporaryFormattedTextWithoutPlugin, temporaryFormattedText),
      );

      return applyPatches(temporaryFormattedTextWithoutPlugin, patchesPerPlugin);
    },
    firstFormattedTextPromise,
  );

  return sequentiallyMergedText;
}

function transformParser(
  parserName: SupportedParserNames,
  transformOptions:
    | {
        defaultParser: Parser;
        externalPluginName?: string;
      }
    | {
        defaultParser: null;
        externalPluginName: string;
      },
): Parser {
  const { defaultParser, externalPluginName } = transformOptions;

  // @ts-expect-error: Since the parser handles all the work and just passes the results to the printer, it's okay if `locStart` and `locEnd` are not present.
  return {
    ...(defaultParser ?? {}),
    parse: async (text: string, options: ParserOptions): Promise<FormattedTextAST> => {
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

      let externalPlugin: Plugin | undefined;

      if (externalPluginName) {
        externalPlugin = plugins
          .filter(
            (plugin) =>
              // @ts-expect-error: `name` is presumed to be injected internally by Prettier.
              plugin.name === externalPluginName,
          )
          .at(0);

        if (!externalPlugin) {
          throw new Error(`There is no plugin with the name '${externalPluginName}'.`);
        }
      }

      const parserImplementedPlugins = plugins
        .slice(0, pluginIndex)
        .filter((plugin) => plugin.parsers?.[parserName]);
      const result = await sequentialFormattingAndTryMerging(
        {
          ...options,
          originalText: text,
        },
        parserImplementedPlugins,
        externalPlugin,
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
  babel: transformParser('babel', {
    defaultParser: babelParsers.babel,
  }),
  'babel-ts': transformParser('babel-ts', {
    defaultParser: babelParsers['babel-ts'],
  }),
  typescript: transformParser('typescript', {
    defaultParser: typescriptParsers.typescript,
  }),
  angular: transformParser('angular', {
    defaultParser: htmlParsers.angular,
  }),
  html: transformParser('html', {
    defaultParser: htmlParsers.html,
  }),
  vue: transformParser('vue', {
    defaultParser: htmlParsers.vue,
  }),
  oxc: transformParser('oxc', {
    defaultParser: null,
    externalPluginName: '@prettier/plugin-oxc',
  }),
  'oxc-ts': transformParser('oxc-ts', {
    defaultParser: null,
    externalPluginName: '@prettier/plugin-oxc',
  }),
  astro: transformParser('astro', {
    defaultParser: null,
    externalPluginName: 'prettier-plugin-astro',
  }),
  svelte: transformParser('svelte', {
    defaultParser: null,
    externalPluginName: 'prettier-plugin-svelte',
  }),
};
