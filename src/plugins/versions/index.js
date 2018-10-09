import VersionsSelector from './VersionsSelector.vue'

export default {
  name: 'versions',
  extend(api) {
    if (api.store.getters.config.versions) {
      api.registerComponent('sidebar:start', VersionsSelector)
    }
  }
}
