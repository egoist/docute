const path = require('path')

module.exports = {
  plugins: [
    require('postcss-import')({
      path: [path.resolve('src/assets/css')]
    }),
    require('postcss-mixins')(),
    require('postcss-cssnext')({
      features: {
        customProperties: {
          preserve: true
        }
      }
    })
  ]
}
