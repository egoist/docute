import Vue from 'vue'
import Meta from 'vue-meta'
import Root from './components/Root.vue'
import createRouter from './router/index'
import createStore from './store/index'
import defaultLayouts from './layouts/index'
import AlertIcon from './components/AlertIcon'

Vue.use(Meta, {
  keyName: 'head',
  attribute: 'data-docute-meta',
  ssrAttribute: 'data-dh-server-rendered',
  tagIDKeyName: 'vmid'
})

Vue.component(AlertIcon.name, AlertIcon)

class Docute {
  constructor({
    docs,
    nav,
    defaultFileName = 'README',
    routerMode = 'hash',
    base = '/',
    toc,
    site,
    source,
    layouts
  } = {}) {
    this.config = {
      docs,
      nav,
      defaultFileName,
      routerMode,
      toc,
      site,
      source,
      base
    }
    this.layouts = {
      ...defaultLayouts,
      ...layouts
    }
  }

  createVm() {
    this.vm = new Vue({
      router: createRouter({
        routerMode: this.config.routerMode,
        routeProps: {
          layouts: this.layouts
        },
        base: this.config.base
      }),
      store: createStore(this.config),
      render(h) {
        return h(Root)
      }
    })
    return this
  }

  start(el = '#docute') {
    this.createVm()
    this.vm.$mount(el)
    return this
  }
}

if (typeof window !== 'undefined') {
  window.Vue = Vue
}

export default Docute
