import Vue from 'vue'
import Router from 'vue-router'
import event from '@/utils/event'

Vue.use(Router)

export default ({ routerMode, routeProps }) => {
  const router = new Router({
    mode: routerMode,
    routes: [
      {
        path: '*',
        props: routeProps,
        component: () => import(/* webpackChunkName: "page" */ '@/pages/page.vue')
      }
    ],
    scrollBehavior(to, from, savedPosition) {
      return new Promise(resolve => {
        event.once('content-updated', () => {
          if (savedPosition) {
            return resolve(savedPosition)
          }
          resolve({ x: 0, y: 0 })
        })
      })
    }
  })

  return router
}
