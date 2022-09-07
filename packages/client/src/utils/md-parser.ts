import { unified, Processor } from "unified";
import remarkRehype from "remark-rehype";
import remarkParse from "remark-parse";
import emoji from "remark-emoji";
import rehypeHighlight from "rehype-highlight";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import remarkBreaks from "remark-breaks";
// eslint-disable-next-line import/no-unresolved
import * as Mdast from "mdast";
// eslint-disable-next-line import/no-unresolved
import * as Hast from "hast";
import haskell from "highlight.js/lib/languages/haskell";
import scala from "highlight.js/lib/languages/scala";
import ocaml from "highlight.js/lib/languages/ocaml";
import remarkGfm from "remark-gfm";

function markdownProcessor(): Processor<
  Mdast.Root,
  Mdast.Root,
  Mdast.Root,
  void
> {
  return unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkBreaks)
    .use(emoji)
    .use(remarkMath);
}

export function rehypeProcessor(): Processor<
  Mdast.Root,
  Hast.Root,
  Hast.Root,
  void
> {
  return markdownProcessor()
    .use(remarkRehype)
    .use(rehypeHighlight, { languages: { haskell, scala, ocaml } })
    .use(rehypeKatex);
}
