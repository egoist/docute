import Vue from 'vue'
import Router from 'vue-router'
import RouterPrefetch from 'vue-router-prefetch'
import Home from './views/Home.vue'

Vue.use(Router)
Vue.use(RouterPrefetch)

export default routerConfig =>
  new Router({
    scrollBehavior(to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      }
      return {x: 0, y: 0}
    },
    ...routerConfig,
    routes: [
      {
        path: '*',
        component: Home
      }
    ]
  })
