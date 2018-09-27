import Vue from 'vue'
import Vuex from 'vuex'
import loadjs from 'loadjs'
import fetch from 'unfetch'
import marked from './utils/marked'
import highlight from './utils/highlight'
import { slugify, getFilenameByPath } from './utils'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    html: '',
    originalConfig: {},
    page: {
      title: null,
      headings: null
    },
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
    }
  },

  actions: {
    async fetchFile({ commit, dispatch, getters }, path) {
      commit('TOGGLE_SIDEBAR', false)
      commit('SET_FETCHING', true)
      const file = getFilenameByPath(getters.config.sourcePath, path)
      const [text] = await Promise.all([
        fetch(file).then(res => res.text()),
        dispatch('fetchPrismLanguages')
      ])
      const renderer = new marked.Renderer()

      const headings = []
      const slugs = []
      renderer.heading = function(text, level, raw) {
        let slug = slugify(raw)
        slugs.push(slug)
        const sameSlugCount = slugs.filter(v => v === slug).length
        if (sameSlugCount > 1) {
          slug += `-${sameSlugCount}`
        }

        if (level === 1) {
          store.commit('SET_PAGE_TITLE', text)
        } else if (level === 2 || level === 3) {
          headings.push({
            level,
            raw,
            // Remove trailing HTML
            text: raw.replace(/<.*>\s*$/g, ''),
            slug
          })
        }

        const tag = `h${level}`
        return `<${tag} id="${slug}">${text}</${tag}>`
      }

      // Disable template interpolation in code
      renderer.codespan = text => `<code v-pre>${text}</code>`
      const origCode = renderer.code
      renderer.code = function(code, lang, excaped) {
        const codeOptsRE = /({.+})/
        let codeOpts = {}
        if (lang && codeOptsRE.test(lang)) {
          codeOpts = codeOptsRE.exec(lang)[1].trim()
          try {
            // eslint-disable-next-line no-new-func
            const fn = new Function(`return ${codeOpts}`)
            codeOpts = fn()
          } catch (err) {
            throw new Error(
              `You're using invalid options for code fences, it must be JSON or JS object!\n${
                err.message
              }`
            )
          }
          lang = lang.replace(codeOptsRE, '').trim()
        }

        let res = origCode
          .call(this, code, lang, excaped)
          .replace(/^<pre>/, '<pre v-pre>')

        if (codeOpts.highlight) {
          const codeMask = code
            .split('\n')
            .map((v, i) => {
              i += 1
              const shouldHighlight = codeOpts.highlight.some(number => {
                if (typeof number === 'number') {
                  return number === i
                }
                if (typeof number === 'string') {
                  const [start, end] = number.split('-').map(Number)
                  return i >= start && (!end || i <= end)
                }
                return false
              })
              return shouldHighlight
                ? `<span class="code-line highlighted">&#8203;</span>`
                : `<span class="code-line">&#8203;</span>`
            })
            .join('')
          res += `<div class="code-mask">${codeMask}</div>`
        }

        return `<div data-lang="${lang || ''}" class="pre-wrapper">${res}</div>`
      }

      commit(
        'SET_HTML',
        marked(text, {
          renderer,
          highlight
        })
      )
      commit('SET_PAGE_HEADINGS', headings)
      commit('SET_FETCHING', false)
    },

    fetchPrismLanguages({ state, getters }) {
      const ID = 'prism-languages'

      if (!getters.config.highlight || loadjs.isDefined(ID))
        return Promise.resolve()

      return new Promise(resolve => {
        loadjs(
          getters.config.highlight.map(lang => {
            return `https://cdn.jsdelivr.net/npm/prismjs/components/prism-${lang}.min.js`
          }),
          ID,
          {
            success: resolve,
            error(err) {
              console.error('Failed to load', err)
              resolve()
            }
          }
        )
      })
    }
  },

  getters: {
    currentLocalePath({ originalConfig, route }) {
      const { locales } = originalConfig

      if (locales) {
        // Is it a locale?
        for (const localePath of Object.keys(locales)) {
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

    config({ originalConfig }, { currentLocalePath }) {
      const { locales } = originalConfig
      return locales
        ? {
            ...originalConfig,
            ...locales[currentLocalePath]
          }
        : originalConfig
    },

    homePaths({ originalConfig }) {
      const localePaths = originalConfig.locales
        ? Object.keys(originalConfig.locales)
        : []
      return [...localePaths, '/']
    }
  }
})

if (process.env.NODE_ENV === 'development') {
  window.store = store
}

export default store
