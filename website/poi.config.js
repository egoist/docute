const path = require('path')
const pkg = require('../package')

module.exports = {
  entry: 'website/index.js',
  outDir: 'website/dist',
  define: {
    __DOCUTE_VERSION__: JSON.stringify(pkg.version)
  },
  copy: [
    {
      from: 'website/docs',
      to: 'docs'
    }
  ],
  vue: {
    fullBuild: true
  }
}
