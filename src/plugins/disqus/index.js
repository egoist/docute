const Disqus = require('./Disqus.vue').default

module.exports = ({ shortname } = {}) => {
  return ({ registerComponent }) => {
    registerComponent('content:end', {
      functional: true,
      render(h) {
        return <Disqus shortname={shortname} />
      }
    })
  }
}
