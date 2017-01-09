const config = require('./vue.config')

module.exports = {
  ...config,
  port: 5001,
  dist: 'plugins',
  template: false,
  umd: 'docsearch',
  entry: './src/plugins/docsearch',
  filename: 'docsearch',
  clean: false,
  production: {
    filename: 'docsearch',
    devtool: false,
    compress: true
  },
  live: true
}
