import Vue from 'vue'
import Router from 'vue-router'
import Home from 'views/Home.vue'
import Page from 'views/Page.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home,
      meta: {
        name: 'home'
      }
    },
    {
      path: '/:page',
      component: Page,
      meta: {
        name: 'page'
      }
    }
  ]
})
