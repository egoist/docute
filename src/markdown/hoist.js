export default md => {
  const RE = /^<(script|style)(?=(\s|>|$))/i

  md.renderer.rules.html_block = (tokens, idx, options, env) => {
    let content = tokens[idx].content
    env.hoistedTags = env.hoistedTags || []
    if (RE.test(content.trim())) {
      content = content.trim()
      const [, type] = RE.exec(content)
      env.hoistedTags.push({
        type,
        content
      })
      return ''
    }
    return content
  }
}
