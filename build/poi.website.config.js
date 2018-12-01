const path = require('path')
// eslint-disable-next-line import/no-extraneous-dependencies
const express = require('express')
const pkg = require('../package')

module.exports = {
  entry: 'website/index.js',
  output: {
    dir: 'website/dist',
    html: {
      title: 'Docute'
    }
  },
  devServer: {
    after(server) {
      server.use('/', express.static(path.resolve('website/docs')))
    }
  },
  chainWebpack(config) {
    config.resolve.alias.set('vue$', 'vue/dist/vue.esm.js')
  },
  constants: {
    __DOCUTE_VERSION__: JSON.stringify(pkg.version),
    __PRISM_VERSION__: JSON.stringify(require('prismjs/package').version),
    __DEPS__: JSON.stringify(Object.keys(pkg.dependencies))
  }
}
