const RE = /\s*{([\d,-]+)}/

const renderPreWrapper = (preWrapperAttrs, preAttrs, code, codeMask = '') =>
  `<div${preWrapperAttrs}>${codeMask}<pre${preAttrs}><code${preAttrs}>${code.trim()}</code></pre></div>`

export default md => {
  md.renderer.rules.fence = (...args) => {
    const [tokens, idx, options, , self] = args
    const token = tokens[idx]

    const langName = token.info.replace(RE, '').trim()

    const code = options.highlight
      ? options.highlight(token.content, langName)
      : token.content

    const renderAttrs = attrs => self.renderAttrs({ attrs })

    const preAttrs = renderAttrs([
      ...(token.attrs || []),
      ['class', langName ? `language-${langName}` : '']
    ])
    const preWrapperAttrs = renderAttrs([
      ['class', 'pre-wrapper'],
      ['v-pre', ''],
      ['data-lang', langName]
    ])

    if (!token.info || !RE.test(token.info)) {
      return renderPreWrapper(preWrapperAttrs, preAttrs, code)
    }

    const lineNumbers = RE.exec(token.info)[1]
      .split(',')
      .map(v => v.split('-').map(v => parseInt(v, 10)))
    token.info = langName

    const codeMask =
      '<div class="code-mask">' +
      md.utils
        .escapeHtml(token.content)
        .split('\n')
        .map((split, index) => {
          split = split || '&#8203;'
          const lineNumber = index + 1
          const inRange = lineNumbers.some(([start, end]) => {
            if (start && end) {
              return lineNumber >= start && lineNumber <= end
            }
            return lineNumber === start
          })
          if (inRange) {
            return `<span class="code-line highlighted">${split}</span>`
          }
          return `<span class="code-line">${split}</span>`
        })
        .join('') +
      '</div>'

    return renderPreWrapper(preWrapperAttrs, preAttrs, code, codeMask)
  }
}
