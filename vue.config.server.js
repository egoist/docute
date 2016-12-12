import pkg from './package'

const externals = Object.keys(pkg.dependencies).map(name => {
  return new RegExp(`^${name}`)
})

export default {
  title: 'docute-server',
  resolve: true,
  postcss() {
    return [
      require('cssbag')()
    ]
  },
  clean: false,
  cjs: true,
  hash: false,
  html: false,
  filename: 'server',
  devtool: false,
  compress: false,
  mergeConfig: {
    externals
  }
}
