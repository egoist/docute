const pkg = require('../package')

module.exports = {
  entry: 'src/index.js',
  plugins: [
    {
      resolve: {
        apply(api) {
          api.hook('onCreateWebpackConfig', config => {
            config.resolve.alias.set('vue$', 'vue/dist/vue.esm.js')
            config.output.libraryExport('default')
          })
        }
      }
    }
  ],
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
  }
}
