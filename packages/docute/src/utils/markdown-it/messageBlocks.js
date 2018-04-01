const RE = /^__(Info|Warning|Success|Note|Alert)__\:\s+(.*)/i

export default () => md => {
  md.renderer.rules.blockquote_open = (...args) => {
    const [tokens, idx, options, env, self] = args
    const token = tokens[idx + 2]
    if (token.type === 'inline') {
      const [, type, content] = token.content.match(RE) || []
      if (type && content) {
        let findStrongClose = false
        // Remove first 4 items, which are `__MessageType__`
        token.children.splice(0, 4)
        // Remove leading `:\s*`
        token.children[0].content = token.children[0].content.replace(
          /^:\s+/,
          ''
        )
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
