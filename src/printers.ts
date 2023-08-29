import type { AstPath, ParserOptions, Doc, Printer, Plugin } from 'prettier';
import { format } from 'prettier';

function printWithMergedPlugin(
  path: AstPath,
  options: ParserOptions,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  print: (path: AstPath) => Doc,
): Doc {
  const node = path.getValue();

  const { originalText } = options;
  const plugins = options.plugins.filter((plugin) => typeof plugin !== 'string') as Plugin[];
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

  const sequentiallyFormattedText = plugins.slice(0, pluginIndex).reduce(
    (previousText, plugin) =>
      format(previousText, {
        ...options,
        plugins: [plugin],
        rangeEnd: Infinity,
      }),
    originalText,
  );

  if (node?.comments) {
    node.comments.forEach((comment: any) => {
      // eslint-disable-next-line no-param-reassign
      comment.printed = true;
    });
  }

  return sequentiallyFormattedText;
}

export const printers: { [astFormat: string]: Printer } = {
  'merging-ast': {
    print: printWithMergedPlugin,
  },
};
