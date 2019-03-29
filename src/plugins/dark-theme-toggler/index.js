import DarkThemeToggler from './DarkThemeToggler.vue'

export default {
  name: 'dark-theme-toggler',
  extend: api => {
    const position = api.store.getters.config.darkThemeToggler
    if (position === true) {
      api.registerComponent('sidebar:post-end', DarkThemeToggler)
    } else if (position === 'sidebar') {
      api.registerComponent('header-right:start', DarkThemeToggler)
      api.registerComponent('mobile-sidebar:start', DarkThemeToggler)
    }
  }
}
