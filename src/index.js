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
import Note from './components/Note.vue'
import Gist from './components/Gist.vue'
import Loading from './components/Loading.vue'
import ExternalLinkIcon from './components/icons/ExternalLinkIcon.vue'
import {INITIAL_STATE_NAME} from './utils/constants'

// Built-in plugins
import i18nPlugin from './plugins/i18n'
import evaluateContentPlugin from './plugins/evaluateContent'
import versionsPlugin from './plugins/versions'
import bannerFooter from './plugins/banner-footer'
import darkThemeToggler from './plugins/dark-theme-toggler'

Vue.component(ImageZoom.name, ImageZoom)
Vue.component(Badge.name, Badge)
Vue.component(DocuteSelect.name, DocuteSelect)
Vue.component(Note.name, Note)
Vue.component(ExternalLinkIcon.name, ExternalLinkIcon)
Vue.component(Gist.name, Gist)
Vue.component(Loading.name, Loading)
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

    store.commit('SET_CONFIG', {
      title: document.title,
      ...config
    })

    const plugins = [
      i18nPlugin,
      evaluateContentPlugin,
      versionsPlugin,
      bannerFooter,
      darkThemeToggler,
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
    // Force hydration when there's initial state
    const hydrate = Boolean(window[INITIAL_STATE_NAME])
    this.app.$mount(`#${target}`, hydrate)
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
}

Docute.version = __DOCUTE_VERSION__

export default Docute

if (typeof window !== 'undefined') {
  window.Vue = Vue
}
