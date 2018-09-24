import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import Root from './components/Root.vue'
import store from './store'
import router from './router'
import markdownMixins from './utils/markdownMixins'
import ImageZoom from './components/ImageZoom.vue'
import Badge from './components/Badge.vue'

sync(store, router)

Vue.use(markdownMixins)
Vue.component(ImageZoom.name, ImageZoom)
Vue.component(Badge.name, Badge)

class Docute {
  constructor({
    target,
    title = document.title,
    nav,
    highlight
  } = {}) {
    store.commit('SET_CONFIG', {
      title,
      nav,
      highlight
    })

    this.vm = new Vue({
      router,
      store,
      render: h => h(Root)
    })

    if (target) {
      this.start(target)
    }
  }

  start(target) {
    this.vm.$mount(target)
  }
}

Docute.version = __DOCUTE_VERSION__

export default Docute

if (typeof window !== 'undefined') {
  window.Vue = Vue
}
