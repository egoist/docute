import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default ({ routerMode }) => {
  const router = new Router({
    mode: routerMode,
    routes: [
      {
        path: '*',
        component: () =>
          import(/* webpackChunkName: "pages-docs" */ '../pages/docs/index.vue')
      }
    ],
    scrollBehavior(to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      } else {
        return { x: 0, y: 0 }
      }
    }
  })

  return router
}
