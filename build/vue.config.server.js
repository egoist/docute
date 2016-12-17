import pkg from './package'

const externals = Object.keys(pkg.dependencies).map(name => {
  return new RegExp(`^${name}`)
})

export default {
  entry: './src/server.js',
  title: 'docute-server',
  resolve: true,
  postcss() {
    return [
      require('autoprefixer')({
        browsers: ['ie > 8', 'last 4 versions']
      }),
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
