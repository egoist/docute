import Vue from 'vue'
import Vuex from 'vuex'
import {isType} from 'utils'
import jump from 'utils/jump'
import nprogress from 'nprogress'

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
    config: typeof window === 'undefined' ? {} : (window.$config || {}),
    page: {
      html: '',
      attributes: null,
      headings: []
    },
    loaded: false,
    showSidebar: false,
    jumping: false,
    activeId: '',
    searching: false,
    searchResult: null,
    searchKeyword: ''
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
      state.activeId = ''
    },
    TOGGLE_SIDEBAR(state, payload) {
      if (payload !== undefined) state.showSidebar = payload
      else state.showSidebar = !state.showSidebar
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
      jump(id, () => setTimeout(() => {
        dispatch('stopJumping')
      }, 400))
    },
    startSearching({commit}) {
      nprogress.start()
      commit('START_SEARCHING')
    },
    stopSearching({commit}, payload) {
      nprogress.done()
      commit('STOP_SEARCHING', payload)
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
    currentIcons(state) {
      const defaultIcons = []

      const {
        disableDefaultIcons,
        icons = [],
        'edit-link': editLink,
        repo,
        twitter
      } = state.config

      const {path} = state.route
      const {attributes} = state.page

      if (!disableDefaultIcons) {
        if (editLink) {
          let filename = path
          if (/\/$/.test(filename)) filename += 'README'
          defaultIcons.push({
            link: `${editLink}${filename}.md`,
            label: 'Edit this page',
            svg: 'edit'
          })
        }
        if (repo) {
          defaultIcons.push({
            link: `https://github.com/${repo}`,
            label: 'Star me on GitHub',
            svg: 'github'
          })
        }
        if (twitter) {
          defaultIcons.push({
            link: `https://twitter.com/${twitter}`,
            label: 'Follow me on Twitter',
            svg: 'twitter'
          })
        }
      }

      let currentIcons
      if (isType(icons, 'Object') && attributes) {
        currentIcons = icons[attributes.icons] || icons.default
      } else {
        currentIcons = icons.default || icons
      }

      return defaultIcons.concat(currentIcons)
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
    }
  }
})

export default store
