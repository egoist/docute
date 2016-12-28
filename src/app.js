import './promise'
import 'isomorphic-fetch'
import Vue from 'vue'
import router from 'router'
import store from 'store'
import {sync} from 'vuex-router-sync'
import App from 'components/App.vue'
import {registerComponent} from 'utils/component-manager'

sync(store, router)

const plugins = store.state.config.plugins
if (Array.isArray(plugins)) {
  for (const plugin of plugins) {
    if (typeof plugin === 'function') plugin({
      store,
      router,
      registerComponent
    })
  }
}

const app = new Vue({
  router,
  store,
  ...App
})

export {app, store, router}
