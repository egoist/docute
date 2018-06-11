import Vue from 'vue'
import Meta from 'vue-meta'
import App from './components/App.vue'
import createRouter from './router'
import createStore from './store'
import cssMixin from './mixins/css'

// Icons
import ExternalLinkIcon from './components/icons/ExternalLink.vue'
import SearchIcon from './components/icons/Search.vue'
import MenuIcon from './components/icons/Menu.vue'
Vue.component(ExternalLinkIcon.name, ExternalLinkIcon)
Vue.component(SearchIcon.name, SearchIcon)
Vue.component(MenuIcon.name, MenuIcon)

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
