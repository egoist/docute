import Vue from 'vue'
import Meta from 'vue-meta'
import App from './components/App.vue'
import createRouter from './router'
import createStore from './store'
import cssMixin from './mixins/css'

const globalComponents = [
  './Badge.vue',
  './ImageZoom.vue'
]
// global components
const importGlobalComponents = r => {
  r.keys().forEach(k => {
    if (globalComponents.indexOf(k) > -1) {
      const component = r(k).default
      Vue.component(component.name, component)
    }
  })
}
importGlobalComponents(require.context('./components', false, /\.vue$/))

// Register all icons as global components
const importIcons = r => {
  r.keys().forEach(k => {
    const component = r(k).default
    Vue.component(component.name, component)
  })
}
importIcons(require.context('./components/icons', false, /\.vue$/))


Vue.mixin(cssMixin)


Vue.use(Meta, {
  keyName: 'head',
  attribute: 'data-docute',
  ssrAttribute: 'data-docute-ssr',
  tagIDKeyName: 'vmid'
})

export default class Docute {
  constructor(options = {}) {
    const root = options.root || '/'
    this.options = {
      title: document.title,
      indexFile: 'README.md',
      sourceRoot: root,
      ...options,
      root
    }

    this.vm = new Vue({
      router: createRouter(this.options),
      store: createStore({
        siteConfig: this.options
      }),
      render: h => h(App)
    })
  }

  start(el = '#docute') {
    this.vm.$mount(el)
  }
}

window.Vue = Vue

window.DOCUTE_VERSION = __DOCUTE_VERSION__
