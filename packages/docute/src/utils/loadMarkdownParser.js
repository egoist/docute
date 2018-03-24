let parser

export default async () => {
  if (parser) return parser

  const MarkdownIt = await import(/* webpackChunkName: "markdown-it" */ 'markdown-it').then(res => res.default)
  parser = new MarkdownIt({
    html: true
  })
  return parser
}
