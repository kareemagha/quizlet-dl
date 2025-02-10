declare module 'markdown-it-katex' {
  import MarkdownIt from 'markdown-it';

  function markdownItKatex(options?: any): MarkdownIt.PluginSimple;
  export = markdownItKatex;
}