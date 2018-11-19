import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default ({routerMode}) =>
  new Router({
    mode: routerMode,
    routes: [
      {
        path: '*',
        component: Home
      }
    ],
    scrollBehavior(to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      }
      return {x: 0, y: 0}
    }
  })
