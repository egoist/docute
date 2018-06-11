export default md => {
  const defaultCodeInline = md.renderer.rules.code_inline
  md.renderer.rules.code_inline = (...args) => {
    const [tokens, idx] = args
    const token = tokens[idx]
    token.attrSet('v-pre', '')
    return defaultCodeInline(...args)
  }
}
