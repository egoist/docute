import Vue from 'vue'
import Meta from 'vue-meta'
import Root from './components/Root.vue'
import createRouter from './router'
import createStore from './store'

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
    source
  } = {}) {
    const config = {
      docs,
      nav,
      defaultFileName,
      routerMode,
      toc,
      site,
      source
    }
    this.vm = new Vue({
      router: createRouter({ routerMode }),
      store: createStore(config),
      render(h) {
        return <Root />
      }
    })
  }

  start(el = '#docute') {
    this.vm.$mount(el)
    return this
  }
}

export default Docute
