import Vue from 'vue'
import Vuex from 'vuex'
import {isType} from 'utils'

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
    config: self.$config,
    attributes: null,
    page: {
      html: '',
      attributes: null
    },
    loaded: false
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
    },
    UPDATE_PAGE(state, page) {
      state.page = page
      state.loaded = true
    }
  },
  actions: {
    toggleDropdown({commit}, index) {
      commit('TOGGLE_DROPDOWN', index)
    },
    updatePage({commit}, payload) {
      commit('UPDATE_PAGE', payload)
    }
  },
  getters: {
    currentTitle(state, getters) {
      const path = state.route.path
      const current = flatten(getters.currentNav).filter(item => {
        return item.path === path
      })[0]
      return current && current.title
    },
    currentNav(state) {
      const nav = state.config.nav
      const attributes = state.attributes
      if (Array.isArray(nav)) {
        return nav
      }
      if (isType(nav, 'Object')) {
        return (attributes && attributes.nav) ?
          nav[attributes.nav] :
          nav.default
      }
      return []
    }
  }
})

export default store
