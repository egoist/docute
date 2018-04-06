import Vue from 'vue'
import Router from 'vue-router'
import event from '@/utils/event'
import Page from '@/pages/page.vue'

Vue.use(Router)

export default ({ routerMode, routeProps, base }) => {
  const router = new Router({
    mode: routerMode,
    base,
    routes: [
      {
        path: '*',
        props: routeProps,
        component: Page
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
