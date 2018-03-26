let MarkdownIt

export default async () => {
  if (MarkdownIt) return MarkdownIt

  MarkdownIt = await import(/* webpackChunkName: "markdown-it" */ 'markdown-it').then(res => res.default)
  return MarkdownIt
}
