const pkg = require('../package')

module.exports = {
  entry: 'src/index.js',
  output: {
    format: 'umd',
    moduleName: 'Docute',
    fileNames: {
      js: 'docute.js',
      css: 'docute.css'
    },
    clean: false
  },
  constants: {
    __DOCUTE_VERSION__: JSON.stringify(pkg.version),
    __PRISM_VERSION__: JSON.stringify(require('prismjs/package').version)
  },
  chainWebpack(config) {
    config.resolve.alias.set('vue$', 'vue/dist/vue.esm.js')
    config.output.libraryExport('default')
    config.output.globalObject('this')
  }
}
