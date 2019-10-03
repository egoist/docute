/* globals __PRISM_VERSION__ */
import Vue from 'vue'
import Vuex from 'vuex'
import marked from './utils/marked'
import highlight from './utils/highlight'
import {getFilenameByPath, getFileUrl, isExternalLink, inBrowser} from './utils'
import markedRenderer from './utils/markedRenderer'
import hooks from './hooks'
import load from './utils/load'
import prismLanguages from './utils/prismLanguages'
import {defaultCssVariables, darkCssVariables} from './utils/cssVariables'
import {INITIAL_STATE_NAME} from './utils/constants'

Vue.use(Vuex)

const initialState = inBrowser && window[INITIAL_STATE_NAME]

const getDefaultTheme = (store, {theme, detectSystemDarkTheme}) => {
  if (!inBrowser || !detectSystemDarkTheme) {
    return theme || 'default'
  }

  const mq = window.matchMedia('(prefers-color-scheme: dark)')

  mq.addListener(() => {
    store.commit('SET_THEME', mq.matches ? 'dark' : 'default')
  })

  return theme || (mq.matches ? 'dark' : 'default')
}

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
    fetchingFile: true,
    ...initialState
  },

  mutations: {
    SET_CONFIG(state, config = {}) {
      config.layout = config.layout || 'narrow'
      // TODO: remove `centerContent` in next major version
      if (config.centerContent) {
        config.layout = 'narrow'
      }
      config.theme = getDefaultTheme(store, config)
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
    },

    SET_THEME(state, theme) {
      state.originalConfig.theme = theme
    }
  },

  actions: {
    async fetchFile({commit, getters, dispatch}, path) {
      commit('TOGGLE_SIDEBAR', false)
      commit('SET_FETCHING', true)

      let page = {
        markdown: true,
        ...(getters.config.routes && getters.config.routes[path])
      }

      if (!page.content && !page.file) {
        const filename = getFilenameByPath(path)
        page.file = getFileUrl(getters.config.sourcePath, filename)
        page.editLink =
          getters.config.editLinkBase &&
          getFileUrl(getters.config.editLinkBase, filename)
      }

      await Promise.all([
        !page.content &&
          fetch(page.file, getters.config.fetchOptions)
            .then(res => res.text())
            .then(res => {
              page.content = res
            }),
        dispatch('fetchPrismLanguages')
      ])

      page.content = await hooks.processPromise('processMarkdown', page.content)
      page = await hooks.processPromise('processPage', page)

      const env = {
        headings: [],
        mixins: [],
        config: getters.config
      }
      if (page.markdown) {
        page.content = marked(page.content, {
          renderer: markedRenderer(hooks),
          highlight,
          env
        })
      }
      page.content = await hooks.processPromise('processHTML', page.content)
      page.headings = env.headings
      if (!page.title) {
        page.title = env.title
      }
      commit('SET_PAGE', page)
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
              // backward compabillity
              const children = next.children || next.links || []
              return [...res, ...children]
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

    cssVariables(_, {config}) {
      return {
        ...(config.theme === 'dark' ? darkCssVariables : defaultCssVariables),
        ...(typeof config.cssVariables === 'function'
          ? config.cssVariables(config.theme)
          : config.cssVariables)
      }
    }
  }
})

if (process.env.NODE_ENV === 'development' && inBrowser) {
  window.store = store
}

export default store
