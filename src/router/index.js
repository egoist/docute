import Vue from 'vue'
import Router from 'vue-router'
import nprogress from 'nprogress'
import Home from 'views/Home.vue'
import Page from 'views/Page.vue'
import NotFound from 'views/404.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      component: Home,
      meta: {
        name: 'home'
      }
    },
    {
      path: '/404',
      component: NotFound,
      meta: {
        name: 404
      }
    },
    {
      path: '/*',
      component: Page,
      meta: {
        name: 'page'
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  nprogress.set(0.3)
  next()
})

export default router
