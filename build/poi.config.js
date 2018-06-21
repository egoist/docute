const pkg = require('../package')

module.exports = {
  entry: 'src/index.js',
  moduleName: 'Docute',
  format: 'umd',
  filename: {
    js: 'docute.js',
    css: 'docute.css'
  },
  define: {
    __DOCUTE_VERSION__: JSON.stringify(pkg.version)
  }
}
