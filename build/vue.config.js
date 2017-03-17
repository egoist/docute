const path = require('path')
const express = require('express')
const pkg = require('../package')

module.exports = {
  entry: 'src/index.js',
  html: {
    title: 'docute-client',
    template: 'template.html',
    inject: false
  },
  format: 'umd',
  moduleName: 'docute',
  templateCompiler: true,
  port: 5000,
  define: {
    '__DOCUTE_VERSION__': JSON.stringify(pkg.version)
  },
  webpack(config) {
    config.resolve.modules.push(path.resolve('src'))
    return config
  },
  postcss: [
    require('cssbag')()
  ],
  setup(app) {
    app.use('/', express.static('docs'))
  },
  production: {
    html: false,
    vendor: false
  },
  filename: {
    js: 'docute.js',
    css: 'docute.css'
  }
}
