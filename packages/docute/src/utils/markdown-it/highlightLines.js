const RE = /{([\d,-]+)}/

export default () => md => {
  const fence = md.renderer.rules.fence
  md.renderer.rules.fence = (...args) => {
    const [tokens, idx, options, env, self] = args
    const token = tokens[idx]

    if (!token.info || !RE.test(token.info)) {
      return fence(...args)
    }

    const lineNumbers = RE.exec(token.info)[1]
      .split(',')
      .map(v => v.split('-').map(v => parseInt(v)))
    const langName = token.info.replace(RE, '')

    const code = options.highlight
      ? options.highlight(token.content, langName)
      : token.content
    const codeSplits = code.split('\n').map((split, index) => {
      const lineNumber = index + 1
      const inRange = lineNumbers.some(([start, end]) => {
        if (start && end) {
          return lineNumber >= start && lineNumber <= end
        }
        return lineNumber === start
      })
      if (inRange) {
        return {
          code: `<span class="docute-highlight-line">${split}</span>`,
          highlighted: true
        }
      }
      return {
        code: split
      }
    })
    let highlightedCode = ''
    codeSplits.forEach(
      split =>
        split.highlighted
          ? (highlightedCode += split.code)
          : (highlightedCode += `${split.code}\n`)
    )
    const tmpToken = {
      attrs: [['class', langName ? `language-${langName}` : '']]
    }
    return `<pre${self.renderAttrs(
      tmpToken
    )}><code>${highlightedCode.trim()}</code></pre>`
  }
}
