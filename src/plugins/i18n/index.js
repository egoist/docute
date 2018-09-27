import LanguageSelector from './LanguageSelector.vue'

export default {
  name: 'i18n',
  extend: api => {
    if (api.store.state.originalConfig.locales) {
      api.registerComponent('sidebar:start', LanguageSelector)
    }
  }
}
