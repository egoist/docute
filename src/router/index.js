import Vue from 'vue'
import Router from 'vue-router'
import Page from '../components/Page.vue'

Vue.use(Router)

export default ({ root }) => {
  const router = new Router({
    mode: 'hash',
    base: root,
    scrollBehavior (to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      } else {
        return { x: 0, y: 0 }
      }
    },
    routes: [
      {
        path: '/*',
        component: Page
      }
    ]
  })

  return router
}
