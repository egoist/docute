const pkg = require('../package')

const lib = {
  name: 'lib',
  apply(api) {
    api.chainWebpack(config => {
      config.resolve.alias.set('vue$', 'vue/dist/vue.esm.js')
      config.output.libraryTarget('umd')
      config.output.library('Docute')
      config.output.libraryExport('default')
    })
  }
}

module.exports = {
  entry: 'src/index.js',
  plugins: [
    {
      resolve: lib
    }
  ],
  filenames: {
    js: 'docute.js',
    css: 'docute.css'
  },
  sourceMap: false,
  cleanOutDir: false,
  constants: {
    __DOCUTE_VERSION__: JSON.stringify(pkg.version),
    __PRISM_VERSION__: JSON.stringify(require('prismjs/package').version)
  }
}
