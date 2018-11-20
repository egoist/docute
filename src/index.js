import Vue from 'vue'
import {sync} from 'vuex-router-sync'
import PluginAPI from './PluginAPI'
import Root from './components/Root.vue'
import store from './store'
import createRouter from './router'
import alternativeComponents from './utils/alternativeComponents'
import ImageZoom from './components/ImageZoom.vue'
import Badge from './components/Badge.vue'
import DocuteSelect from './components/DocuteSelect.vue'
import ExternalLinkIcon from './components/icons/ExternalLinkIcon.vue'

// Built-in plugins
import i18nPlugin from './plugins/i18n'
import evaluateContentPlugin from './plugins/evaluateContent'
import versionsPlugin from './plugins/versions'

Vue.component(ImageZoom.name, ImageZoom)
Vue.component(Badge.name, Badge)
Vue.component(DocuteSelect.name, DocuteSelect)
Vue.component(ExternalLinkIcon.name, ExternalLinkIcon)
Vue.use(alternativeComponents)

Vue.mixin({
  created() {
    const pluginApi = this.$options.pluginApi || this.$root.$pluginApi
    if (pluginApi) {
      this.$pluginApi = pluginApi
    }
  }
})

class Docute {
  constructor(config = {}) {
    const router = createRouter(config.router)
    sync(store, router)

    store.commit('SET_ORIGINAL_CONFIG', {
      title: document.title,
      ...config
    })

    const plugins = [
      i18nPlugin,
      evaluateContentPlugin,
      versionsPlugin,
      ...(store.state.originalConfig.plugins || [])
    ]
    this.pluginApi = new PluginAPI({plugins, store, router})
    this.applyPlugins()

    this.app = new Vue({
      router,
      store,
      pluginApi: this.pluginApi,
      render: h => h(Root)
    })

    if (config.mount !== false) {
      this.mount()
    }
  }

  mount() {
    const {target} = store.getters
    this.app.$mount(`#${target}`)
    this.collectInstance()
    return this
  }

  /**
   * @private
   */
  applyPlugins() {
    for (const plugin of this.pluginApi.plugins) {
      plugin.extend(this.pluginApi)
    }
  }

  /**
   * Used in pre-render
   * @private
   */
  collectInstance() {
    if (typeof window !== 'undefined' && window.__DOCUTE_INSTANCE__) {
      window.__DOCUTE_INSTANCE__ = this
    }
  }
}

Docute.version = __DOCUTE_VERSION__

export default Docute

if (typeof window !== 'undefined') {
  window.Vue = Vue
}
