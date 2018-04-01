const RE = /^__(Info|Warning|Success|Note|Alert)__\:\s+(.*)/i

export default () => md => {
  md.renderer.rules.blockquote_open = (...args) => {
    const [tokens, idx, options, env, self] = args
    const token = tokens[idx + 2]
    console.log(token.content)
    if (token.type === 'inline') {
      const [, type, content] = token.content.match(RE) || []
      if (type && content) {
        const textToken = token.children.pop()
        textToken.content = textToken.content.slice(1)
        token.children = [textToken]
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
