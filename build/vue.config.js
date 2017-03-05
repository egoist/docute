const path = require('path')
const express = require('express')
const pkg = require('../package')

module.exports = {
  entry: {
    docute: ['src/index.js'],
    'theme-github': ['src/css/theme-github.css']
  },
  hmrEntry: ['docute', 'theme-github'],
  html: {
    title: 'docute-client',
    template: 'template.html',
    inject: false
  },
  port: 5000,
  define: {
    '__DOCUTE_VERSION__': JSON.stringify(pkg.version)
  },
  webpack(config) {
    config.resolve.alias = {
      'vue$': 'vue/dist/vue.common.js'
    }
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
    js: '[name].js',
    css: '[name].css'
  }
}
