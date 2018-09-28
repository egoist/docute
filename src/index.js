import Vue from 'vue'
import {sync} from 'vuex-router-sync'
import PluginAPI from './PluginAPI'
import Root from './components/Root.vue'
import store from './store'
import router from './router'
import markdownMixins from './utils/markdownMixins'
import ImageZoom from './components/ImageZoom.vue'
import Badge from './components/Badge.vue'

// Built-in plugins
import i18nPlugin from './plugins/i18n'

sync(store, router)

Vue.use(markdownMixins)
Vue.component(ImageZoom.name, ImageZoom)
Vue.component(Badge.name, Badge)

Vue.mixin({
  created() {
    const pluginApi = this.$options.pluginApi || this.$root.$pluginApi
    if (pluginApi) {
      this.$pluginApi = pluginApi
    }
  }
})

class Docute {
  constructor({target, ...config} = {}) {
    store.commit('SET_ORIGINAL_CONFIG', {
      title: document.title,
      ...config
    })

    const plugins = [i18nPlugin, ...(store.state.originalConfig.plugins || [])]
    this.pluginApi = new PluginAPI({plugins, store, router})
    this.applyPlugins()

    this.app = new Vue({
      router,
      store,
      pluginApi: this.pluginApi,
      render: h => h(Root)
    })

    if (target) {
      this.start(target)
    }
  }

  start(target) {
    this.app.$mount(target)
  }

  applyPlugins() {
    for (const plugin of this.pluginApi.plugins) {
      plugin.extend(this.pluginApi)
    }
  }
}

Docute.version = __DOCUTE_VERSION__

export default Docute

if (typeof window !== 'undefined') {
  window.Vue = Vue
}
