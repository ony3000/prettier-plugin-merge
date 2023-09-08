import type { AstPath, ParserOptions, Doc, Printer, Plugin } from 'prettier';
import { format } from 'prettier';

function sequentialFormatting(options: ParserOptions, plugins: Plugin[]): string {
  const { originalText } = options;
  const sequentiallyFormattedText = plugins.reduce(
    (previousText, plugin) =>
      format(previousText, {
        ...options,
        plugins: [plugin],
        rangeEnd: Infinity,
      }),
    originalText,
  );

  return sequentiallyFormattedText;
}

function createPrinter(): Printer {
  function main(
    path: AstPath,
    options: ParserOptions,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    print: (path: AstPath) => Doc,
  ): Doc {
    const node = path.getValue();

    if (node?.comments) {
      node.comments.forEach((comment: any) => {
        // eslint-disable-next-line no-param-reassign
        comment.printed = true;
      });
    }

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

    return sequentialFormatting(options, plugins.slice(0, pluginIndex));
  }

  return {
    print: main,
  };
}

export const printers: { [astFormat: string]: Printer } = {
  'merging-ast': createPrinter(),
};
