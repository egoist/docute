module.exports = {
  plugins: [
    '@babel/plugin-syntax-object-rest-spread',
    ['module:fast-async', {
      spec: true
    }]
  ]
}
