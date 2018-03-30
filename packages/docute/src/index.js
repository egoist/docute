import Vue from 'vue'
import Meta from 'vue-meta'
import Root from './components/Root.vue'
import createRouter from './router'
import createStore from './store'
import defaultLayouts from './layouts'

Vue.use(Meta, {
  keyName: 'head',
  attribute: 'data-docute-meta',
  ssrAttribute: 'data-dh-server-rendered',
  tagIDKeyName: 'vmid'
})

class Docute {
  constructor({
    docs,
    nav,
    defaultFileName = 'README',
    routerMode = 'hash',
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
      source
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
        }
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
