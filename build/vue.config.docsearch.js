const config = require('./vue.config')

module.exports = {
  port: 5001,
  cleanDist: false,
  dist: 'plugins',
  postcss: config.postcss,
  html: false,
  format: 'umd',
  moduleName: 'docsearch',
  hot: false,
  entry: './src/plugins/docsearch',
  filename: {
    js: 'docsearch.js'
  }
}
