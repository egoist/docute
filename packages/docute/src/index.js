import Vue from 'vue'
import Root from './components/Root.vue'
import createRouter from './router'
import createStore from './store'

import 'typeface-source-sans-pro/index.css'

const flatten = routes => {
  return routes.reduce((res, item) => {
    return [
      ...res,
      item,
      ...(item.children ? flatten(item.children) : [])
    ]
  }, []).filter(item => item.path)
}

class Docute {
  constructor({
    docs,
    nav,
    defaultFileName = 'README',
    routerMode = 'hash',
    toc
  } = {}) {
    const config = {
      docs,
      nav,
      defaultFileName,
      routerMode,
      toc
    }
    const routes = flatten([...(nav || []), ...(docs || [])])
    this.vm = new Vue({
      router: createRouter({ routes, routerMode }),
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
