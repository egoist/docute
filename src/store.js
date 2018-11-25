/* globals __PRISM_VERSION__ */
import Vue from 'vue'
import Vuex from 'vuex'
import fetch from 'isomorphic-unfetch'
import marked from './utils/marked'
import highlight from './utils/highlight'
import {getFilenameByPath, isExternalLink} from './utils'
import markedRenderer from './utils/markedRenderer'
import hooks from './hooks'
import load from './utils/load'
import prismLanguages from './utils/prismLanguages'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    originalConfig: {},
    page: {
      title: null,
      headings: null,
      html: ''
    },
    env: {},
    showSidebar: false,
    fetchingFile: true
  },

  mutations: {
    SET_ORIGINAL_CONFIG(state, config) {
      state.originalConfig = config
    },

    SET_PAGE(state, page) {
      state.page = page
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
    async fetchFile({commit, getters, dispatch}, {path, text}) {
      commit('TOGGLE_SIDEBAR', false)
      commit('SET_FETCHING', true)
      const file = getFilenameByPath(getters.config.sourcePath, path)

      await Promise.all([
        !text &&
          fetch(file)
            .then(res => res.text())
            .then(res => {
              text = res
            }),
        dispatch('fetchPrismLanguages')
      ])

      text = hooks.process('processMarkdown', text)

      const env = {
        headings: [],
        file
      }
      let html = marked(text, {
        renderer: markedRenderer(hooks),
        highlight,
        env
      })
      html = hooks.process('processHTML', html)
      commit('SET_PAGE', {
        title: env.title,
        headings: env.headings,
        html
      })
      commit('SET_ENV', env)
      commit('SET_FETCHING', false)
    },

    fetchPrismLanguages({getters}) {
      const langs = getters.config.highlight

      if (!langs || langs.length === 0) {
        return Promise.resolve()
      }

      return load(
        langs
          .reduce((res, lang) => {
            if (prismLanguages[lang]) {
              res = res.concat(prismLanguages[lang])
            }
            res.push(lang)
            return res
          }, [])
          .filter((lang, i, arr) => {
            // Dedupe
            return (
              arr.indexOf(lang) === i &&
              prismLanguages.builtin.indexOf(lang) === -1
            )
          })
          .map(lang => {
            return `https://unpkg.com/prismjs@${__PRISM_VERSION__}/components/prism-${lang}.js`
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
      const sidebar = config.sidebar || []
      return typeof sidebar === 'function' ? sidebar(store) : sidebar
    },

    centerContent(_, {config}) {
      return config.centerContent !== false
    }
  }
})

if (process.env.NODE_ENV === 'development') {
  window.store = store
}

export default store
