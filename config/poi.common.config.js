const path = require('path')

module.exports = {
  chainWebpack(config) {
    config.resolve.alias
      .set('docute$', path.join(__dirname, '../src/index.js'))
      .set('@', path.join(__dirname, '../src'))
      .set('vue$', 'vue/dist/vue')

    config.node.set('fs', 'empty').set('net', 'empty')
  }
}
