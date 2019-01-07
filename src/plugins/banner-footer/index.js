const getComponent = (str, className) =>
  typeof str === 'string'
    ? {template: `<div class="${className}">${str}</div>`}
    : str

export default {
  name: 'banner-footer',
  extend(api) {
    const {banner, footer} = api.store.getters.config
    if (banner) {
      api.registerComponent('main:start', getComponent(banner, 'docute-banner'))
    }
    if (footer) {
      api.registerComponent('main:end', getComponent(footer, 'docute-footer'))
    }
  }
}
