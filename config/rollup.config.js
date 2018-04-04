import path from 'path'

export default {
  input: ['src/index.js', 'src/utils/markdown-it/markdown-it.js'],
  experimentalDynamicImport: true,
  experimentalCodeSplitting: true,
  plugins: [
    require('rollup-plugin-vue')({
      css: path.resolve('themes/docute.css')
    }),
    require('rollup-plugin-babel')()
  ],
  output: {
    dir: path.resolve('es'),
    format: 'es'
  }
}
