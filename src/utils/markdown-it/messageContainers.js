import containerPlugiin from 'markdown-it-container'

const RE = /^(Info|Warning|Success|Note|Alert)$/i

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
        return `<div class="message ${helperType.toLowerCase()}">\n` // opening tag
      }
      return '</div>\n' // closing tag
    }
  }
])
