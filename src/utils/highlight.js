import hljs from 'highlight.js/lib/highlight'

hljs.registerLanguage('javascript', require('highlight.js/lib/languages/javascript'))
hljs.registerLanguage('xml', require('highlight.js/lib/languages/xml'))
hljs.registerLanguage('css', require('highlight.js/lib/languages/css'))
hljs.registerLanguage('go', require('highlight.js/lib/languages/go'))
hljs.registerLanguage('cpp', require('highlight.js/lib/languages/cpp'))
hljs.registerLanguage('rust', require('highlight.js/lib/languages/rust'))
hljs.registerLanguage('ocaml', require('highlight.js/lib/languages/ocaml'))
hljs.registerLanguage('php', require('highlight.js/lib/languages/php'))
hljs.registerLanguage('bash', require('highlight.js/lib/languages/bash'))

export default hljs
