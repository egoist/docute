import Vue from 'vue'
import Router from 'vue-router'
import store from 'store'
import Page from 'views/Page.vue'
import NotFound from 'views/404.vue'
import Landing from 'views/Landing.vue'

Vue.use(Router)

const { landing } = store.state.config

const routes = [
  {
    path: landing ? '/home' : '/',
    component: Page,
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

if (landing) {
  routes.unshift({
    path: '/',
    component: Landing,
    meta: {
      name: 'landing'
    }
  })
}

const router = new Router({
  routes
})

export default router
