import containerPlugiin from 'markdown-it-container'

const RE = /^(tip|warning|danger)$/

export default md => ([
  containerPlugiin,
  'css-helper',
  {
    validate (params) {
      return params.trim().match(RE)
    },

    render(tokens, idx) {
      const [, helperType] = tokens[idx].info.trim().match(RE) || []
      if (tokens[idx].nesting === 1) {
        return `<p class="${helperType}">\n` // opening tag
      }
      return '</p>\n' // closing tag
    }
  }
])
