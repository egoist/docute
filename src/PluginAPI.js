import Vue from 'vue'
import InjectedComponents from './components/InjectedComponents'

export default class PluginAPI {
  constructor({ plugins, store, router }) {
    this.plugins = plugins
    this.store = store
    this.router = router
    this.components = {}

    Vue.component(InjectedComponents.name, InjectedComponents)
  }

  hasPlugin(name) {
    return this.plugins.filter(plugin => plugin.name === name).length > 0
  }

  registerComponent(position, component) {
    this.components[position] = this.components[position] || []
    this.components[position].push(component)
    return this
  }

  getComponents(position) {
    return this.components[position] || []
  }
}
