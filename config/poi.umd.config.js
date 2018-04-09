const path = require('path')
const common = require('./poi.common.config')

module.exports = Object.assign(common, {
  entry: path.resolve('es/index.js'),
  outDir: path.resolve('dist'),
  format: 'umd',
  moduleName: 'docute',
  html: false,
  sourceMap: false,
  hash: false,
  configureWebpack(config) {
    config.entry.docute = config.entry.main
    delete config.entry.main

    // This should be fixed in Poi
    // Do not set it to `all` when `format` is set
    delete config.optimization.splitChunks.chunks
    delete config.optimization.runtimeChunk

    return config
  }
})
