import containerPlugiin from 'markdown-it-container'

const RE = /^(tip|warning|danger)$/

export default md => ([
  containerPlugiin,
  'css-helpers',
  {
    validate (params) {
      return params.trim().match(RE)
    },

    render(tokens, idx) {
      const [, helperType] = tokens[idx].info.trim().match(RE) || []
      // TODO Temporarily using div instead of p is because a bug of markdown-it-container
      // Refer to https://github.com/markdown-it/markdown-it-container/issues/22
      if (tokens[idx].nesting === 1) {
        return `<div class="${helperType}">\n` // opening tag
      }
      return '</div>\n' // closing tag
    }
  }
])
