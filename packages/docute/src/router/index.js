import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default ({ routes, routerMode }) => {
  const router = new Router({
    mode: routerMode,
    routes: routes.map((route, index) => ({
      path: route.path,
      component: () => import(/* webpackChunkName: "page" */ '@/pages/page.vue'),
      props: {
        source: route.source
      }
    })),
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
