import Vue from 'vue'
import InjectedComponents from './components/InjectedComponents'
import hooks from './hooks'

export default class PluginAPI {
  constructor({plugins, store, router}) {
    this.plugins = plugins
    this.store = store
    this.router = router
    this.components = {}
    this.hooks = hooks
    this.search = {}

    Vue.component(InjectedComponents.name, InjectedComponents)
  }

  hasPlugin(name) {
    return this.plugins.filter(plugin => plugin.name === name).length > 0
  }

  registerComponent(position, component, props) {
    this.components[position] = this.components[position] || []
    this.components[position].push({component, props})
    return this
  }

  getComponents(position) {
    return this.components[position] || []
  }

  processMarkdown(fn) {
    this.hooks.add('processMarkdown', fn)
    return this
  }

  processHTML(fn) {
    this.hooks.add('processHTML', fn)
    return this
  }

  extendMarkedRenderer(fn) {
    this.hooks.add('extendMarkedRenderer', fn)
    return this
  }

  onContentUpdated(fn) {
    this.hooks.add('onContentUpdated', fn)
    return this
  }

  extendMarkdownComponent(fn) {
    this.hooks.add('extendMarkdownComponent', fn)
    return this
  }

  enableSearch(search = {}) {
    this.search = search
    this.search.enabled = true
    return this
  }
}
