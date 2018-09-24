import Prism from 'prismjs'

export default function highlight(str, lang) {
  if (!lang) return str

  let resolvedLang = lang && Prism.languages[lang]
  if (!resolvedLang) {
    lang = 'markup'
    resolvedLang = Prism.languages.markup
  }

  return Prism.highlight(str, resolvedLang, lang)
}
