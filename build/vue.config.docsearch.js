const config = require('./vue.config')

module.exports = {
  port: 5001,
  cleanDist: false,
  dist: 'plugins',
  html: false,
  format: 'umd',
  moduleName: 'docsearch',
  entry: './src/plugins/docsearch',
  filename: {
    js: 'docsearch.js'
  }
}
