import Token from 'markdown-it/lib/token'

const RE = /^__(Info|Warning|Success|Note|Danger)__\:\s+(.*)/i

export default () => md => {
  md.renderer.rules.blockquote_open = (...args) => {
    const [tokens, idx, options, env, self] = args
    const token = tokens[idx + 2]
    if (token.type === 'inline') {
      const [, type, content] = token.content.match(RE) || []
      if (type && content) {
        // Remove leading `:\s*`
        token.children[4].content = token.children[4].content.replace(
          /^:\s+/,
          ''
        )
        // Omit first 4 items, which are `__MessageType__`
        token.children = [
          {
            ...new Token('html_inline', '', 0),
            content: `<alert-icon name="${
              type.toLowerCase() === 'success' ? 'check' : 'alert'
            }" />`
          },
          ...token.children.slice(3)
        ]
        // Change 'blockquote' to 'div'
        const blockquoteOpenToken = tokens[idx]
        const blockquoteCloseToken = tokens
          .slice(idx + 1)
          .find(token => token.type === 'blockquote_close')
        blockquoteOpenToken.tag = 'div'
        blockquoteOpenToken.attrs = [['class', `alert ${type.toLowerCase()}`]]
        blockquoteCloseToken.tag = 'div'
      }
    }
    return self.renderToken(...args)
  }
}
