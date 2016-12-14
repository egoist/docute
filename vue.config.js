import express from 'express'
import pkg from './package'

export default {
  title: 'docute-client',
  port: 5000,
  resolve: true,
  template: 'template.html',
  replace: {
    '__DOCUTE_VERSION__': JSON.stringify(pkg.version)
  },
  postcss() {
    return [
      require('autoprefixer')({
        browsers: ['ie > 8', 'last 4 versions']
      }),
      require('cssbag')()
    ]
  },
  devServer(app) {
    app.use('/', express.static('docs'))
  },
  production: {
    hash: false,
    html: false,
    filename: 'docute'
  }
}
