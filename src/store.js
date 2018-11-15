import Vue from 'vue'
import Vuex from 'vuex'
import fetch from 'unfetch'
import marked from './utils/marked'
import highlight from './utils/highlight'
import {getFilenameByPath, isExternalLink} from './utils'
import markedRenderer from './utils/markedRenderer'
import hooks from './hooks'
import load from './utils/load'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    html: '',
    originalConfig: {},
    page: {
      title: null,
      headings: null
    },
    env: {},
    showSidebar: false,
    fetchingFile: true
  },

  mutations: {
    SET_HTML(state, html) {
      state.html = html
    },

    SET_ORIGINAL_CONFIG(state, config) {
      state.originalConfig = config
    },

    SET_PAGE_TITLE(state, title) {
      state.page.title = title
    },

    SET_PAGE_HEADINGS(state, headings) {
      state.page.headings = headings
    },

    TOGGLE_SIDEBAR(state, show) {
      state.showSidebar = typeof show === 'boolean' ? show : !state.showSidebar
    },

    SET_FETCHING(state, fetching) {
      state.fetchingFile = fetching
    },

    SET_ENV(state, env) {
      state.env = env
    }
  },

  actions: {
    async fetchFile({commit, getters, dispatch}, path) {
      commit('TOGGLE_SIDEBAR', false)
      commit('SET_FETCHING', true)
      const file = getFilenameByPath(getters.config.sourcePath, path)
      let [text] = await Promise.all([
        fetch(file).then(res => res.text()),
        dispatch('fetchPrismLanguages')
      ])

      text = hooks.process('processMarkdown', text)

      const env = {
        headings: [],
        file
      }
      let html = marked(text, {
        renderer: markedRenderer(env, hooks),
        highlight
      })
      html = hooks.process('processHTML', html)
      commit('SET_PAGE_TITLE', env.title)
      commit('SET_PAGE_HEADINGS', env.headings)
      commit('SET_FETCHING', false)
      commit('SET_ENV', env)
      commit('SET_HTML', html)
    },

    fetchPrismLanguages({getters}) {
      if (!getters.config.highlight) {
        return Promise.resolve()
      }

      return load(
        getters.config.highlight.map(lang => {
          return `https://unpkg.com/prismjs/components/prism-${lang}.min.js`
        }),
        'prism-languages'
      )
    }
  },

  getters: {
    target({originalConfig: {target}}) {
      if (!target) return 'docute'
      if (target[0] === '#') return target.slice(1)
      return target
    },

    languageOverrides({originalConfig}) {
      // `locales` is for legacy support
      const overrides = originalConfig.overrides || originalConfig.locales
      return (
        overrides &&
        Object.keys(overrides).reduce((res, path) => {
          if (overrides[path].language) {
            res[path] = overrides[path]
          }
          return res
        }, {})
      )
    },

    currentLocalePath({route}, {languageOverrides}) {
      if (languageOverrides) {
        // Is it a locale?
        for (const localePath of Object.keys(languageOverrides)) {
          if (localePath !== '/') {
            const RE = new RegExp(`^${localePath}`)
            if (RE.test(route.path)) {
              return localePath
            }
          }
        }
      }

      return '/'
    },

    config({originalConfig}, {currentLocalePath, languageOverrides}) {
      return languageOverrides
        ? {
            ...originalConfig,
            ...languageOverrides[currentLocalePath]
          }
        : originalConfig
    },

    homePaths(_, {languageOverrides}) {
      const localePaths = languageOverrides
        ? Object.keys(languageOverrides)
        : []
      return [...localePaths, '/']
    },

    sidebarLinks(_, {sidebar}) {
      return sidebar
        ? sidebar
            .reduce((res, next) => {
              return [...res, ...next.links]
            }, [])
            .filter(item => {
              return !isExternalLink(item.link)
            })
        : []
    },

    sidebar(_, {config}) {
      if (config.nav) {
        console.warn('"nav" option has been renamed to "sidebar".')
      }
      return config.sidebar || config.nav || []
    }
  }
})

if (process.env.NODE_ENV === 'development') {
  window.store = store
}

export default store
