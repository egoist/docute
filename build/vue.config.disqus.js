const merge = require('webpack-merge')
const config = require('./vue.config')

module.exports = {
  port: 5002,
  dist: 'plugins',
  html: false,
  cleanDist: false,
  postcss: config.postcss,
  format: 'umd',
  moduleName: 'disqus',
  entry: './src/plugins/disqus',
  vendor: false,
  filename: {
    js: 'disqus.js'
  }
}
