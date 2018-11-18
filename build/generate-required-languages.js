const fs = require('fs')

let {languages} = require('prismjs/components')

languages = Object.keys(languages).reduce((res, name) => {
  if (languages[name].require) {
    res[name] = languages[name].require
  }
  return res
}, {})
languages.builtin = Object.keys(require('prismjs').languages).filter(lang => {
  return !['extend', 'insertBefore', 'DFS'].includes(lang)
})

fs.writeFileSync(
  './src/utils/prismLanguages.json',
  JSON.stringify(languages, null, 2),
  'utf8'
)
