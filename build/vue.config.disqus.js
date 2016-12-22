const config = require('./vue.config')

module.exports = {
  ...config,
  port: 5002,
  dist: 'plugins',
  template: false,
  umd: 'disqus',
  entry: './src/plugins/disqus',
  filename: 'disqus',
  clean: false,
  production: {
    filename: 'disqus',
    devtool: false,
    compress: true
  },
  live: true
}
