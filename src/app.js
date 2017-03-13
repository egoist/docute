import './promise'
import 'isomorphic-fetch'
import Vue from 'vue'
import router from 'router'
import store from 'store'
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
import { sync } from 'vuex-router-sync'
import App from 'components/App.vue'
import { registerComponent } from 'utils/component-manager'
import event from 'utils/event'
import { beforeParse, afterParse } from 'utils/parsers'

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
  router,
  store,
  ...App
})

export { app, store, router }
