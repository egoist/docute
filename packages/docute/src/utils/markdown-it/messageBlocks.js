const RE = /^__(Info|Warning|Success|Note|Alert)__\:\s+(.*)/i

export default () => md => {
  md.renderer.rules.blockquote_open = (...args) => {
    const [tokens, idx, options, env, self] = args
    const token = tokens[idx + 2]
    if (token.type === 'inline') {
      const [, type, content] = token.content.match(RE) || []
      if (type && content) {
        let findStrongClose = false
        // Remove __MessageType__ and ':' token
        const newTokens = token.children.map((childToken) => {
          if (!findStrongClose && childToken.type === 'strong_close') {
            findStrongClose = true
            return
          }
          if (findStrongClose) {
            if (childToken.content.startsWith(':')) {
              childToken.content = childToken.content.replace(/^:\s+/, '')
            }
            return childToken
          }
          return null
        }).filter(v => v)
        token.children = newTokens
        // Change 'blockquote' to 'div'
        const blockquoteOpenToken = tokens[idx]
        const blockquoteCloseToken = tokens[idx + 4]
        blockquoteOpenToken.tag = 'div'
        blockquoteOpenToken.attrs = [['class', `message ${type.toLowerCase()}`]]
        blockquoteCloseToken.tag = 'div'
      }
    }
    return self.renderToken(...args)
  }
}
