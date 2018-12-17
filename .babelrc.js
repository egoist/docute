const IS_TEST = process.env.NODE_ENV === 'test'

module.exports = {
  presets: [
    ['minimal', {
      mode: 'loose'
    }],
    IS_TEST && 'power-assert'
  ].filter(Boolean)
}
