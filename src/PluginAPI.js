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

  enableLocalSearch() {
    const entries = []
    for (let x = 0; x < this.store.getters.sidebar.length; x++) {
      const obj = this.store.getters.sidebar[x]
      if (obj && obj.title && obj.link) {
        entries.push({
          title: obj.title,
          link: obj.link
        })
      }
      if (obj.children) {
        for (let y = 0; y < obj.children.length; y++) {
          const obj2 = obj.children[y]
          entries.push(obj2)
        }
      }
    }

    this.search = {
      handler: keyword => {
        return entries.filter(value =>
          value.title.toLowerCase().includes(keyword.toLowerCase())
        )
      }
    }
    this.search.enabled = true
    return this
  }
}
