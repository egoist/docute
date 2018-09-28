exports.name = 'buble'

exports.extend = api => {
  api.chainWebpack(config => {
    config.module
      .rule('buble')
      .test(/\.js$/)
      // Run after the default `js` rule
      .post()
      .exclude.add(/node_modules/)
      .end()
      .use('buble-loader')
      .loader('buble-loader')
      .options({
        objectAssign: 'Object.assign',
        transforms: {dangerousForOf: true}
      })
  })
}
