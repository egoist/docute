import Vue from 'vue'
import Root from './components/Root.vue'
import createRouter from './router'
import createStore from './store'

import 'typeface-source-sans-pro/index.css'

class Docute {
  constructor({
    summary,
    nav,
    defaultFileName = 'README',
    routerMode = 'hash'
  } = {}) {
    const config = {
      summary,
      nav,
      defaultFileName,
      routerMode
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
