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
        state.headings.push({
          depth,
          slug,
          content,
          html: self.render(tokens[idx + 1].children, options, env)
        })
      }

      const anchor = [
        {
          ...new Token('link_open', 'docute-link', 1),
          attrs: [['class', 'docute-heading-anchor'], ['id', slug]]
        },
        {
          ...new Token('span_open', 'span', 1),
          attrs: [['class', 'docute-heading-anchor-symbol']]
        },
        {
          ...new Token('text', '', 0),
          content: '#'
        },
        new Token('span_close', 'span', -1),
        new Token('link_close', 'docute-link', -1)
      ]
      tokens[idx + 1].children.push(...anchor)

      return self.renderToken(...args)
    }
  }
}
