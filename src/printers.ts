import type { AstPath, ParserOptions, Doc, Printer, Plugin } from 'prettier';
import { doc, format } from 'prettier';

import { extractPrinter, makeCommentContext } from './utils';

const { softline } = doc.builders;

const printerErrorMessage =
  'There is no default printer or the function to look for does not exist.';

let defaultPrinter: Printer | undefined;

function printWithMergedPlugin(
  path: AstPath,
  options: ParserOptions,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  print: (path: AstPath) => Doc,
): Doc {
  const node = path.getValue();

  if (!defaultPrinter && node) {
    if (
      (options.parser === 'babel' && node.type === 'File') ||
      (options.parser === 'typescript' && node.type === 'Program')
    ) {
      defaultPrinter = extractPrinter(options);
    }
  }

  if (!defaultPrinter) {
    throw new Error('Default printer does not exist.');
  }

  const { originalText } = options;
  const plugins = options.plugins.filter((plugin) => typeof plugin !== 'string') as Plugin[];
  const sequentiallyFormattedText = plugins.slice(0, -1).reduce(
    (previousText, plugin) =>
      format(previousText, {
        ...options,
        plugins: [plugin],
      }).trimEnd(),
    originalText,
  );

  return [sequentiallyFormattedText, softline];
}

function canAttachComment(node: any): boolean {
  return node.type && node.type !== 'comment';
}

function isBlockCommentWrapper(node: any): boolean {
  if (defaultPrinter?.isBlockComment) {
    return defaultPrinter.isBlockComment(node);
  }

  throw new Error(`[isBlockCommentWrapper] ${printerErrorMessage}`);
}

function printCommentWrapper(commentPath: AstPath, options: ParserOptions): Doc {
  if (defaultPrinter?.printComment) {
    return defaultPrinter.printComment(commentPath, options);
  }

  throw new Error(`[printCommentWrapper] ${printerErrorMessage}`);
}

function ownLineWrapper(
  commentNode: any,
  text: string,
  options: ParserOptions,
  ast: any,
  isLastComment: boolean,
): boolean {
  if (!defaultPrinter && ast) {
    if (
      (options.parser === 'babel' && ast.type === 'File') ||
      (options.parser === 'typescript' && ast.type === 'Program')
    ) {
      defaultPrinter = extractPrinter(options);
    }
  }

  if (defaultPrinter?.handleComments?.ownLine) {
    const commentContext = makeCommentContext(commentNode, text, options, ast, isLastComment);

    return defaultPrinter.handleComments.ownLine(commentContext, text, options, ast, isLastComment);
  }

  throw new Error(`[ownLineWrapper] ${printerErrorMessage}`);
}

function endOfLineWrapper(
  commentNode: any,
  text: string,
  options: ParserOptions,
  ast: any,
  isLastComment: boolean,
): boolean {
  if (!defaultPrinter && ast) {
    if (
      (options.parser === 'babel' && ast.type === 'File') ||
      (options.parser === 'typescript' && ast.type === 'Program')
    ) {
      defaultPrinter = extractPrinter(options);
    }
  }

  if (defaultPrinter?.handleComments?.endOfLine) {
    const commentContext = makeCommentContext(commentNode, text, options, ast, isLastComment);

    return defaultPrinter.handleComments.endOfLine(
      commentContext,
      text,
      options,
      ast,
      isLastComment,
    );
  }

  throw new Error(`[endOfLineWrapper] ${printerErrorMessage}`);
}

function remainingWrapper(
  commentNode: any,
  text: string,
  options: ParserOptions,
  ast: any,
  isLastComment: boolean,
): boolean {
  if (!defaultPrinter && ast) {
    if (
      (options.parser === 'babel' && ast.type === 'File') ||
      (options.parser === 'typescript' && ast.type === 'Program')
    ) {
      defaultPrinter = extractPrinter(options);
    }
  }

  if (defaultPrinter?.handleComments?.remaining) {
    const commentContext = makeCommentContext(commentNode, text, options, ast, isLastComment);

    return defaultPrinter.handleComments.remaining(
      commentContext,
      text,
      options,
      ast,
      isLastComment,
    );
  }

  throw new Error(`[remainingWrapper] ${printerErrorMessage}`);
}

export const printers: { [astFormat: string]: Printer } = {
  'merging-babel-ast': {
    print: printWithMergedPlugin,
    canAttachComment,
    isBlockComment: isBlockCommentWrapper,
    printComment: printCommentWrapper,
    handleComments: {
      ownLine: ownLineWrapper,
      endOfLine: endOfLineWrapper,
      remaining: remainingWrapper,
    },
  },
  'merging-typescript-ast': {
    print: printWithMergedPlugin,
    canAttachComment,
    isBlockComment: isBlockCommentWrapper,
    printComment: printCommentWrapper,
    handleComments: {
      ownLine: ownLineWrapper,
      endOfLine: endOfLineWrapper,
      remaining: remainingWrapper,
    },
  },
};
