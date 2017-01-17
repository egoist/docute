// import hljs from 'highlight.js/lib/highlight'

// hljs.registerLanguage('javascript', require('highlight.js/lib/languages/javascript'))
// hljs.registerLanguage('xml', require('highlight.js/lib/languages/xml'))
// hljs.registerLanguage('vue', require('highlight.js/lib/languages/xml'))
// hljs.registerLanguage('css', require('highlight.js/lib/languages/css'))
// hljs.registerLanguage('cpp', require('highlight.js/lib/languages/cpp'))
// hljs.registerLanguage('bash', require('highlight.js/lib/languages/bash'))
// hljs.registerLanguage('markdown', require('highlight.js/lib/languages/markdown'))
// hljs.registerLanguage('yaml', require('highlight.js/lib/languages/yaml'))

// if (typeof window !== 'undefined') {
//   window.hljs = hljs
// }

import Prism from 'prismjs'
import 'prismjs/components/prism-yaml'
import 'prismjs/components/prism-markdown'
import 'prismjs/components/prism-bash'

export default function highlight(str, lang) {
  return Prism.highlight(str, Prism.languages[lang] || Prism.languages.markup)
}
