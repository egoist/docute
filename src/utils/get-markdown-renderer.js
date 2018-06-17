import highlight from './highlight'

let md

export default async () => {
  if (md) return md

  const [Markdown] = await Promise.all([
    import(/* webpackChunkName: "markdown" */ 'markdown-it').then(
      res => res.default
    ),
    import(/* webpackChunkName: "markdown" */ 'prismjs/components/prism-css'),
    import(/* webpackChunkName: "markdown" */ 'prismjs/components/prism-javascript'),
    import(/* webpackChunkName: "markdown" */ 'prismjs/components/prism-markdown'),
    import(/* webpackChunkName: "markdown" */ 'prismjs/components/prism-bash'),
    import(/* webpackChunkName: "markdown" */ 'prismjs/components/prism-typescript')
  ])
  md = new Markdown({
    html: true,
    linkify: true,
    highlight
  })
  return md
}
