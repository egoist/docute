import containerPlugiin from 'markdown-it-container'

const RE = /^(tip|warning|danger)$/

export default md => ([
  containerPlugiin,
  'message-container',
  {
    validate (params) {
      return params.trim().match(RE)
    },
    render(tokens, idx) {
      const [, helperType] = tokens[idx].info.trim().match(RE) || []
      if (tokens[idx].nesting === 1) {
        return `<div class="message-container ${helperType}">\n` // opening tag
      }
      return '</div>\n' // closing tag
    }
  }
])
