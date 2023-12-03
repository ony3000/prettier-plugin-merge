import type { SubstitutePatch } from 'core-parts';
import { makePatches, applyPatches } from 'core-parts';
import type { AstPath, ParserOptions, Doc, Printer, Plugin, Options } from 'prettier';
import { format, resolveConfig, getFileInfo } from 'prettier';
import {
  isMainThread,
  parentPort,
  receiveMessageOnPort,
  MessageChannel,
  Worker,
} from 'worker_threads';

function sequentialFormattingAndTryMerging(options: ParserOptions, plugins: Plugin[]): string {
  const { originalText, filepath } = options;
  // @ts-ignore
  const configBasedPluginNames = plugins.map((plugin) => plugin.name).filter(Boolean);

  const signal = new Int32Array(new SharedArrayBuffer(4));
  const { port1: mainPort, port2: workerPort } = new MessageChannel();

  const worker = new Worker(__filename);
  worker.unref();

  worker.postMessage(
    { signal, port: workerPort, payload: { originalText, filepath, configBasedPluginNames } },
    [workerPort],
  );
  Atomics.wait(signal, 0, 0, 3000);

  const response = receiveMessageOnPort(mainPort);

  if (response === undefined) {
    throw new Error('No response from worker.');
  }
  if (response.message.error) {
    throw new Error(response.message.error);
  }

  return response.message.result;
}

if (!isMainThread && parentPort) {
  parentPort.addListener('message', async ({ signal, port, payload }) => {
    const response: { result?: string; error?: unknown } = {};
    const { originalText, filepath, configBasedPluginNames } = payload;

    const resolvedConfig = await resolveConfig(filepath);
    const sequentialFormattingOptions: Options = {
      ...Object.fromEntries(
        Object.entries(resolvedConfig ?? {}).filter(([key]) => key !== 'plugins'),
      ),
      rangeEnd: Infinity,
      plugins: [],
    };
    const pluginNames = ((resolvedConfig?.plugins ?? []) as string[]).filter((pluginName) =>
      configBasedPluginNames.includes(pluginName),
    );

    const fileInfo = await getFileInfo(filepath);
    const parserName = fileInfo.inferredParser;

    if (parserName) {
      sequentialFormattingOptions.parser = parserName;
    }

    try {
      const firstFormattedText = await format(originalText, sequentialFormattingOptions);

      /**
       * Changes that may be removed during the sequential formatting process.
       */
      const patches: SubstitutePatch[] = [];

      const sequentiallyMergedText = await pluginNames.reduce<Promise<string>>(
        async (promise, pluginName) => {
          const formattedPrevText = await promise;
          const temporaryFormattedText = await format(formattedPrevText, {
            ...sequentialFormattingOptions,
            plugins: [pluginName],
          });

          const temporaryFormattedTextWithoutPlugin = await format(
            temporaryFormattedText,
            sequentialFormattingOptions,
          );

          patches.push(...makePatches(temporaryFormattedTextWithoutPlugin, temporaryFormattedText));

          if (patches.length === 0) {
            return temporaryFormattedText;
          }

          return applyPatches(temporaryFormattedTextWithoutPlugin, patches);
        },
        Promise.resolve(firstFormattedText),
      );

      response.result = sequentiallyMergedText;
    } catch (error) {
      response.error = error;
    }

    try {
      port.postMessage(response);
    } catch (error) {
      port.postMessage({
        error: new Error("The worker's response could not be serialized."),
      });
    } finally {
      port.close();
      Atomics.store(signal, 0, 1);
      Atomics.notify(signal, 0);
    }
  });
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
