/* globals __DOCUTE_VERSION__ */
import Vue from 'vue'
import Meta from 'vue-meta'
import { sync } from 'vuex-router-sync'
import App from './components/App.vue'
import createRouter from './router'
import createStore from './store'
import cssMixin from './mixins/css'
import docuteMixin from './mixins/docute'
import landingPlugin from './plugins/landing'

const globalComponents = ['./Badge.vue', './ImageZoom.vue']
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
Vue.mixin(docuteMixin)

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

    const store = createStore({
      siteConfig: this.options
    })

    const router = createRouter(this.options)

    sync(store, router)

    this.vm = new Vue({
      data: {
        layouts: {}
      },
      router,
      store,
      render: h => h(App)
    })
    this.store = store

    const plugins = [landingPlugin].concat(this.options.plugins || [])

    for (const plugin of plugins) {
      plugin.apply(this)
    }
  }

  start(el = '#docute') {
    this.vm.$mount(el)
  }

  registerLayout(layout, component) {
    this.vm.layouts = {
      ...this.vm.layouts,
      [layout]: component
    }
  }
}

window.Vue = Vue

window.DOCUTE_VERSION = __DOCUTE_VERSION__
