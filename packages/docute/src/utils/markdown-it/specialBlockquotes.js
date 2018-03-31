const RE = /^__(Info|Warning|Success|Note)__\:\s+(.*)/

export default () => md => {
  md.renderer.rules.blockquote_open = (...args) => {
    const [tokens, idx, options, env, self] = args
    const token = tokens[idx + 2]
    console.log(token)
    if (token.type === 'inline') {
      const [, type] = token.content.match(RE) || []
      if (type) {
        const blockquoteOpenToken = tokens[idx]
        const blockquoteCloseToken = tokens[idx + 4]
        blockquoteOpenToken.tag = 'div'
        blockquoteOpenToken.attrs = [['class', type]]
        blockquoteCloseToken.tag = 'div'
      }
    }
    return self.renderToken(...args)
  }
}
