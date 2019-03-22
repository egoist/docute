module.exports = {
  outDir: 'lib',
  include: '**',
  constants: {
    __DOCUTE_VERSION__: JSON.stringify(require('../package').version),
    __PRISM_VERSION__: JSON.stringify(require('prismjs/package').version)
  }
}
