const path = require('path')
const express = require('express')

module.exports = {
  entry: path.join(__dirname, 'index.js'),
  outDir: path.join(__dirname, 'dist'),
  staticFolder: __dirname,
  extendWebpack(config) {
    config.resolve.alias
      .set('docute$', path.join(__dirname, '../src/index.js'))
      .set('@', path.join(__dirname, '../src'))
      .set('vue$', 'vue/dist/vue')

    config.node.set('fs', 'empty').set('net', 'empty')
  }
}
