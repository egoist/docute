const pkg = require('../package')

const lib = {
  name: 'lib',
  extend(api) {
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
  plugins: [lib],
  filenames: {
    js: 'docute.js',
    css: 'docute.css'
  },
  sourceMap: false,
  cleanOutDir: false,
  constants: {
    __DOCUTE_VERSION__: JSON.stringify(pkg.version)
  }
}
