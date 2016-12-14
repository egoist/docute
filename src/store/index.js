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
    config: typeof window === 'undefined' ? {} : (window.$config || {}),
    page: {
      html: '',
      attributes: null,
      headings: []
    },
    loaded: false,
    showSidebar: false
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
    },
    TOGGLE_SIDEBAR(state, payload) {
      if (payload !== undefined) state.showSidebar = payload
      else state.showSidebar = !state.showSidebar
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
    }
  }
})

export default store
