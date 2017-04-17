// Polyfills
import 'web-polyfill'
import 'unfetch/polyfill'
import 'element-closest'

// Dependencies
import Vue from 'vue'
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
import { sync } from 'vuex-router-sync'

// Ours
import { registerComponent } from 'utils/component-manager'
import { beforeParse, afterParse } from 'utils/parsers'
import event from 'utils/event'
import App from 'components/App.vue'
import createRouter from 'router'
import store from 'store'

window.Vue = Vue

let router
let hasBootstrapped

function init(config = {}) {
  if (hasBootstrapped) {
    throw new Error('You can only initialize Docute for once!')
  }
  hasBootstrapped = true

  store.commit('SET_CONFIG', config)
  router = createRouter(config)

  if (store.state.config.debug) {
    Vue.config.devtools = true
  }

  const plugins = store.state.config.plugins
  if (Array.isArray(plugins)) {
    for (const plugin of plugins) {
      if (typeof plugin === 'function') {
        plugin({
          Vue,
          store,
          router,
          registerComponent,
          event,
          mapState,
          mapGetters,
          mapActions,
          mapMutations,
          beforeParse,
          afterParse
        })
      }
    }
  }

  sync(store, router)

  const app = new Vue({
    store,
    router,
    render: h => h(App)
  })

  document.addEventListener('DOMContentLoaded', () => {
    app.$mount('#app')
  })
}

const version = __DOCUTE_VERSION__ // eslint-disable-line no-undef
const isDev = location.hostname === 'localhost'

export {
  version,
  router,
  store,
  init,
  isDev
}

