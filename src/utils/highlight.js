import Prism from 'prismjs'
import 'prismjs/components/prism-yaml'
import 'prismjs/components/prism-markdown'
import 'prismjs/components/prism-bash'
import store from 'store'

export default function highlight(str, lang) {
  if (typeof store.state.config.highlight === 'function') {
    return store.state.config.highlight(str, lang)
  }
  return Prism.highlight(str, Prism.languages[lang] || Prism.languages.markup)
}
