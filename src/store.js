import Vue from 'vue'
import Vuex from 'vuex'
import loadjs from 'loadjs'
import fetch from 'unfetch'
import marked from './utils/marked'
import highlight from './utils/highlight'
import { slugify } from './utils'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    html: '',
    config: {},
    page: {
      title: null,
      headings: null
    },
    showSidebar: false
  },

  mutations: {
    SET_HTML(state, html) {
      state.html = html
    },

    SET_CONFIG(state, config) {
      state.config = config
    },

    SET_PAGE_TITLE(state, { path, title }) {
      state.page.title = title
      if (path === '/') {
        document.title = state.config.title
      } else {
        document.title = `${title} - ${state.config.title}`
      }
    },

    SET_PAGE_HEADINGS(state, headings) {
      state.page.headings = headings
    },

    TOGGLE_SIDEBAR(state, show) {
      state.showSidebar = typeof show === 'boolean' ? show : !state.showSidebar
    }
  },

  actions: {
    async fetchFile({ commit, dispatch }, path) {
      commit('TOGGLE_SIDEBAR', false)
      commit('SET_HTML', 'Loading...')
      const file = /\/$/.test(path) ? `${path}README.md` : `${path}.md`
      const [text] = await Promise.all([
        fetch(file).then(res => res.text()),
        dispatch('fetchPrismLanguages')
      ])
      const renderer = new marked.Renderer()

      const headings = []
      const slugs = []
      renderer.heading = function (text, level, raw) {
        let slug = slugify(raw)
        slugs.push(slug)
        const sameSlugCount = slugs.filter(v => v === slug).length
        if (sameSlugCount > 1) {
          slug += `-${sameSlugCount}`
        }

        if (level === 1) {
          store.commit('SET_PAGE_TITLE', { path, title: text })
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
      renderer.code = function (code, lang, excaped) {
        const codeOptsRE = /({.+})/
        let codeOpts = {}
        if (lang && codeOptsRE.test(lang)) {
          codeOpts = codeOptsRE.exec(lang)[1].trim()
          try {
            // eslint-disable-next-line no-new-func
            const fn = new Function(`return ${codeOpts}`)
            codeOpts = fn()
          } catch (err) {
            throw new Error(`You're using invalid options for code fences, it must be JSON or JS object!\n${err.message}`)
          }
          lang = lang.replace(codeOptsRE, '').trim()
        }

        let res = origCode.call(this, code, lang, excaped).replace(/^<pre>/, '<pre v-pre>')

        if (codeOpts.highlight) {
          const codeMask = code.split('\n').map((v, i) => {
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
            return shouldHighlight ? `<span class="code-line highlighted">&#8203;</span>` : `<span class="code-line">&#8203;</span>`
          }).join('')
          res += `<div class="code-mask">${codeMask}</div>`
        }

        return `<div data-lang="${lang || ''}" class="pre-wrapper">${res}</div>`
      }

      commit('SET_HTML', marked(text, {
        renderer,
        highlight
      }))
      commit('SET_PAGE_HEADINGS', headings)
    },

    fetchPrismLanguages({ state }) {
      const ID = 'prism-languages'

      if (!state.config.highlight || loadjs.isDefined(ID)) return Promise.resolve()

      return new Promise(resolve => {
        loadjs(state.config.highlight.map(lang => {
          return `https://cdn.jsdelivr.net/npm/prismjs/components/prism-${lang}.min.js`
        }), ID, {
          success: resolve,
          error(err) {
            console.error('Failed to load', err)
            resolve()
          }
        })
      })
    }
  }
})

if (process.env.NODE_ENV === 'development') {
  window.store = store
}

export default store
