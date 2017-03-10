import Vue from 'vue'
import Vuex from 'vuex'
import defined from 'defined'
import {isType} from 'utils'
import jump from 'utils/jump'
import nprogress from 'nprogress'
import event from 'utils/event'

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

const userConfig = typeof window === 'undefined' ? {} : (window.$config || {})

const store = new Vuex.Store({
  state: {
    config: {title: document.title, ...userConfig},
    page: {
      html: '',
      attributes: {},
      headings: []
    },
    loaded: false,
    showMobileSidebar: false,
    jumping: false,
    activeId: '',
    searchState: {
      placeHolder: 'Type to search',
      emptyState: 'No results'
    },
    searching: false,
    searchResult: null,
    searchKeyword: '',
    showSidebar: typeof userConfig.sidebar === 'boolean' ? userConfig.sidebar : true
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
      state.page = {
        attributes: {
          title: null,
          search: null,
          icons: null,
          sidebar: state.config.sidebar,
          ...page.attributes
        },
        html: page.html,
        headings: page.headings
      }
      state.loaded = true
      state.activeId = ''
    },
    TOGGLE_MOBILE_SIDEBAR(state, payload) {
      if (payload === undefined) {
        state.showMobileSidebar = !state.showMobileSidebar
      } else {
        state.showMobileSidebar = payload
      }
    },
    TOGGLE_SIDEBAR(state, payload) {
      let nextState

      if (payload === undefined) {
        const prevState = defined(state.page.attributes.sidebar, state.showSidebar)
        nextState = !prevState
      } else {
        nextState = payload
      }

      state.showSidebar = nextState
      state.page.attributes.sidebar = nextState
    },
    UPDATE_JUMPING(state, payload) {
      state.jumping = payload
    },
    UPDATE_ACTIVE_ID(state, payload) {
      state.activeId = payload
    },
    START_SEARCHING(state) {
      state.searching = true
    },
    STOP_SEARCHING(state, payload) {
      state.searching = false
      state.searchResult = payload
    },
    UPDATE_SEARCH_KEYWORD(state, payload) {
      state.searchKeyword = payload
    }
  },
  actions: {
    toggleDropdown({commit}, index) {
      commit('TOGGLE_DROPDOWN', index)
    },
    updatePage({commit}, payload) {
      commit('UPDATE_PAGE', payload)
    },
    toggleMobileSidebar({commit}, payload) {
      commit('TOGGLE_MOBILE_SIDEBAR', payload)
    },
    toggleSidebar({commit}, payload) {
      commit('TOGGLE_SIDEBAR', payload)
    },
    startJumping({commit}) {
      commit('UPDATE_JUMPING', true)
    },
    stopJumping({commit}) {
      commit('UPDATE_JUMPING', false)
    },
    updateActiveId({commit}, payload) {
      commit('UPDATE_ACTIVE_ID', payload)
    },
    jumpToId({dispatch}, id) {
      dispatch('updateActiveId', id)
      dispatch('startJumping')
      event.emit('jump:started', id)
      jump(id, () => setTimeout(() => {
        dispatch('stopJumping')
        event.emit('jump:stopped', id)
      }, 400))
    },
    startSearching({commit}) {
      nprogress.start()
      commit('START_SEARCHING')
      event.emit('search:started')
    },
    stopSearching({commit}, payload) {
      nprogress.done()
      commit('STOP_SEARCHING', payload)
      event.emit('search:stopped', payload)
    },
    updateSearchKeyword({commit}, payload) {
      commit('UPDATE_SEARCH_KEYWORD', payload)
    },
    searchReset({commit}) {
      commit('UPDATE_SEARCH_KEYWORD', '')
      commit('STOP_SEARCHING', null)
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
      const attributes = state.page.attributes
      if (Array.isArray(nav)) {
        return nav
      }
      if (isType(nav, 'Object')) {
        return (attributes && attributes.nav) ?
          nav[attributes.nav] :
          nav.default
      }
      return []
    },
    documentTitle(state, {currentTitle}) {
      const {config: {title}, page: {attributes}} = state
      if (attributes && attributes.title) {
        return title ? `${attributes.title} - ${title}` : attributes.title
      } else if (currentTitle) {
        return title ? `${currentTitle} - ${title}` : currentTitle
      }
      return state.config.title
    },
    currentTags(state) {
      const {attributes} = state.page
      if (typeof attributes.search === 'string') {
        return [attributes.search]
      }
      if (Array.isArray(attributes.search)) {
        return attributes.search
      }
      return []
    },
    showSidebar(state) {
      if (typeof state.page.attributes.sidebar === 'boolean') {
        return state.page.attributes.sidebar
      }
      return state.showSidebar
    },
    showToc({config, page: {attributes}}) {
      if (attributes.toc !== undefined) {
        return attributes.toc
      }
      if (config.toc !== undefined) {
        return config.toc
      }
      return true
    }
  }
})

export default store
