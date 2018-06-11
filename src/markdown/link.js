export default md => {
  md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
    const token = tokens[idx]
    const hrefIndex = token.attrIndex('href')
    const link = token.attrs[hrefIndex]

    if (link[1].startsWith('#')) {
      token.tag = 'router-link'
      link[0] = ':to'
      link[1] = `{hash: ${JSON.stringify(link[1].slice(1))}}`
    } else if (link[1].startsWith('/')) {
      token.tag = 'router-link'
      link[0] = 'to'
    } else if (/^https?:\/\//.test(link[1])) {
      token.attrSet('target', '_blank')
      token.attrSet('rel', 'noopener noreferrer')
    }

    return self.renderToken(tokens, idx, options)
  }

  md.renderer.rules.link_close = (tokens, idx, options, env, self) => {
    const openToken = tokens[idx - 2]
    const token = tokens[idx]
    let prefix = ''
    if (openToken) {
      if (openToken.tag === 'router-link') {
        token.tag = 'router-link'
      } else if (openToken.attrGet('target') === '_blank') {
        prefix = '<ExternalLinkIcon />'
      }
    }
    return prefix + self.renderToken(tokens, idx, options)
  }
}
