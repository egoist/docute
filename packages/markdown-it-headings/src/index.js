import Slugger from 'github-slugger'
import Token from 'markdown-it/lib/token'

export default state => {
  // Reset slug cache on every render
  const slugger = new Slugger()
  return (md, { minDepth = 2, maxDepth = 3 } = {}) => {
    md.renderer.rules.heading_open = (...args) => {
      const [tokens, idx, options, env, self] = args

      const depth = tokens[idx].markup.length
      const content = tokens[idx + 1].content
      const attrs = tokens[idx].attrs || []
      const slug = slugger.slug(content)
      attrs.push(['id', slug])
      tokens[idx].attrs = attrs

      if (depth >= 2 && depth <= maxDepth) {
        const html = self.render(tokens[idx + 1].children, options, env)
        state.headings.push({
          depth,
          slug,
          content,
          html,
          text: html.replace(/<(?:.|\n)*?>/gm, '')
        })
      }

      const children = tokens[idx + 1].children
      tokens[idx + 1].children = [
        {
          ...new Token('link_open', 'router-link', 1),
          attrs: [['class', 'docute-heading-anchor'], [':to', `{hash:'${slug}'}`]]
        },
        ...children,
        new Token('link_close', 'router-link', -1)
      ]

      return self.renderToken(...args)
    }
  }
}
