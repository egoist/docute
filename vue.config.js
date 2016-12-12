import express from 'express'

export default {
  title: 'docute-client',
  resolve: true,
  template: 'template.html',
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
