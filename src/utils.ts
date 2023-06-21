import type { ParserOptions, Printer, Plugin } from 'prettier';

export function extractPrinter(options: ParserOptions): Printer | undefined {
  const pluginOrNot = (
    options.plugins.filter((plugin) => typeof plugin !== 'string') as Plugin[]
  ).find((plugin) => plugin.printers?.estree);

  if (pluginOrNot) {
    return pluginOrNot.printers!.estree;
  }

  return undefined;
}

/**
 * @see https://github.com/prettier/prettier/blob/2.8.4/src/language-js/comments.js#L41-L49
 */
type CommentContext = {
  comment: any;
  precedingNode: any;
  enclosingNode: any;
  followingNode: any;
  text: string;
  options: ParserOptions;
  ast: any;
  isLastComment: boolean;
};

export function makeCommentContext(
  commentNode: any,
  text: string,
  options: ParserOptions,
  ast: any,
  isLastComment: boolean,
): CommentContext {
  return {
    comment: commentNode,
    precedingNode: commentNode.precedingNode,
    enclosingNode: commentNode.enclosingNode,
    followingNode: commentNode.followingNode,
    text,
    options,
    ast,
    isLastComment,
  };
}
