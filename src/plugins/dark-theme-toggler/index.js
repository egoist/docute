import DarkThemeToggler from './DarkThemeToggler.vue'

export default {
  name: 'dark-theme-toggler',
  extend: api => {
    if (api.store.getters.config.darkThemeToggler) {
      api.registerComponent('header-right:start', DarkThemeToggler)
      api.registerComponent('mobile-sidebar:start', DarkThemeToggler)
    }
  }
}
