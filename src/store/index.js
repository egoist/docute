import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default ({ siteConfig }) => {
  const store = new Vuex.Store({
    state: {
      siteConfig,
      sidebarOpen: false
    },

    getters: {
      siteConfig(state) {
        return state.siteConfig
      }
    },

    mutations: {
      toggleSidebar(state, value) {
        state.sidebarOpen = typeof value === 'boolean' ? value : !state.sidebarOpen
      }
    }
  })

  return store
}
