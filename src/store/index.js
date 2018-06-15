import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default ({ siteConfig }) => {
  const store = new Vuex.Store({
    state: {
      siteConfig: {
        defaultLocale: 'en',
        ...siteConfig
      },
      sidebarOpen: false
    },

    getters: {
      matchedLocalePath({ route, siteConfig }) {
        let matchedLocalePath = '/'

        if (!siteConfig.locales) {
          return matchedLocalePath
        }

        for (const localePath of Object.keys(siteConfig.locales)) {
          const RE = new RegExp(`^${localePath}($|/)?`)
          if (route.path !== '/' && RE.test(route.path)) {
            matchedLocalePath = localePath
          }
        }

        return matchedLocalePath
      },

      siteConfig({ siteConfig }, { matchedLocalePath }) {
        return {
          ...siteConfig,
          ...(siteConfig.locales && siteConfig.locales[matchedLocalePath])
        }
      },

      languageDropdown({ siteConfig, route }, { matchedLocalePath }) {
        if (!siteConfig.locales) return null

        let selectText

        const children = Object.keys(siteConfig.locales).reduce(
          (res, localePath) => {
            const locale = siteConfig.locales[localePath]
            if (localePath === matchedLocalePath) {
              selectText = locale.selectText
            }
            const link =
              localePath +
              route.path.slice(matchedLocalePath.length).replace(/^\/?/, '')
            return [
              ...res,
              {
                text: locale.language,
                active: localePath === matchedLocalePath,
                link
              }
            ]
          },
          []
        )

        return {
          text: selectText,
          children
        }
      }
    },

    mutations: {
      toggleSidebar(state, value) {
        state.sidebarOpen =
          typeof value === 'boolean' ? value : !state.sidebarOpen
      }
    }
  })

  return store
}
