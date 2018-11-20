const path = require('path')
// eslint-disable-next-line import/no-extraneous-dependencies
const express = require('express')
const pkg = require('../package')

module.exports = {
  entry: 'website/index.js',
  outDir: 'website/dist',
  devServer: {
    after(server) {
      server.use('/', express.static(path.resolve('website/docs')))
    }
  },
  // configureWebpack: {
  //   output: {
  //     libraryExport: 'default'
  //   }
  // },
  chainWebpack(config) {
    config.resolve.alias.set('vue$', 'vue/dist/vue.esm.js')
  },
  html: {
    title: 'Docute'
  },
  constants: {
    __DOCUTE_VERSION__: JSON.stringify(pkg.version),
    __PRISM_VERSION__: JSON.stringify(require('prismjs/package').version),
    __DEPS__: JSON.stringify(Object.keys(pkg.dependencies))
  },
  plugins: [
    {
      resolve: require('./plugins/buble')
    }
  ]
}
