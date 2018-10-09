const path = require('path')

module.exports = {
  plugins: [
    require('postcss-import')({
      path: [path.join(__dirname, 'src/css')]
    }),
    require('postcss-preset-env')({
      stage: 0
    })
  ]
}
