import Vue from 'vue'
import router from 'router'
import store from 'store'

window.docute = {
  version: __DOCUTE_VERSION__, // eslint-disable-line no-undef
  router,
  store
}

window.Vue = Vue
