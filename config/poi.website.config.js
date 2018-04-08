const path = require('path')
const common = require('./poi.common.config')

module.exports = Object.assign(common, {
  entry: path.resolve('website/index.js'),
  outDir: path.resolve('website/dist'),
  staticFolder: path.resolve('website'),
  html: {
    title: 'Docute'
  }
})
