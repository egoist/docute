const express = require('express')
const pkg = require('../package')

module.exports = {
  title: 'docute-client',
  port: 5000,
  resolve: true,
  template: 'template.html',
  replace: {
    '__DOCUTE_VERSION__': JSON.stringify(pkg.version)
  },
  alias: {
    'vue$': 'vue/dist/vue.common.js'
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
    filename: 'docute',
    eslint: {
      configFile: 'eslint-config-rem/esnext-browser',
      plugins: [
        'vue'
      ],
      globals: [
        '__DOCUTE_VERSION__',
        'global',
        'require'
      ],
      rules: {
        'vue/jsx-uses-vars': 2,
        'no-unused-vars': ['error', { argsIgnorePattern: '^h$' }]
      }
    }
  }
}
