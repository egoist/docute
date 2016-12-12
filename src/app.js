import Vue from 'vue'
import router from 'router'
import store from 'store'
import {sync} from 'vuex-router-sync'
import App from 'components/App.vue'

sync(store, router)

export default new Vue({
  router,
  store,
  ...App
})
