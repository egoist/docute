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
}
