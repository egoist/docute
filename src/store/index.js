import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const flatten = routes => {
  return routes.reduce((res, item) => {
    return [
      ...res,
      item,
      ...(item.children ? flatten(item.children) : [])
    ]
  }, []).filter(item => item.path)
}

export default config => new Vuex.Store({
  state: {
    config: {
      ...config,
      site: {
        title: 'Docute',
        description: 'My Documentations',
        ...config.site
      }
    }
  }
})
