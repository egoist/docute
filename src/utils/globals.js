import Vue from 'vue'
import router from 'router'
import store from 'store'
import $fetch from 'cash-fetch'

window.docute = {
  version: __DOCUTE_VERSION__,
  router,
  store
}

window.Vue = Vue
window.$fetch = $fetch
