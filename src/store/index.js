import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

function flatten(nav) {
  return nav.map(item => {
    if (item.type === 'dropdown') {
      return item.items
    }
    return [item]
  }).reduce((current, next) => {
    return [
      ...current,
      ...next
    ]
  }, [])
}

const store = new Vuex.Store({
  state: {
    config: self.$config
  },
  mutations: {
    TOGGLE_DROPDOWN(state, index) {
      state.config.nav = state.config.nav.map((item, i) => {
        if (i === index) {
          return {
            ...item,
            show: !item.show
          }
        }
        return item
      })
    }
  },
  actions: {
    toggleDropdown({commit}, index) {
      commit('TOGGLE_DROPDOWN', index)
    }
  },
  getters: {
    currentTitle(state) {
      const path = state.route.path
      const current = flatten(state.config.nav).filter(item => {
        return item.link === path
      })[0]
      return current && current.title
    }
  }
})

export default store
