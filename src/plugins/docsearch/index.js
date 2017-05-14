const algoliasearch = require('algoliasearch/lite')
const Logo = require('./Logo.vue')

module.exports = function ({ apiKey, indexName, url } = {}) {
  return ({ store, registerComponent }) => {
    // the root url might be localhost or production url
    // but the docsearch url must be production url
    let siteUrl = url || store.state.config.url
    if (!siteUrl) {
      return console.error('docsearch requires a `url` option')
    }
    if (/^http:\/\/localhost/.test(siteUrl)) {
      return console.error('`url` option cannot be localhost')
    }
    if (siteUrl.slice(-1) === '/') {
      siteUrl = siteUrl.replace(/\/$/, '')
    }
    const re = new RegExp(`^${siteUrl}(/#)?`)

    registerComponent('sidebar:start', Logo)
    store.registerModule('pluginSearch', {
      actions: {
        search({ commit, dispatch, rootState, getters }, keyword) {
          dispatch('updateSearchKeyword', keyword)
          if (!keyword) {
            dispatch('stopSearching', null)
            return
          }

          dispatch('startSearching')
          const { currentTags } = getters
          const client = algoliasearch('BH4D9OD16A', apiKey)

          client
            .search([
              {
                indexName,
                query: keyword,
                params: {
                  filters: currentTags.length > 0 ?
                    `(${currentTags
                        .map(tag => {
                          tag = /^.+:.+$/.test(tag) ? tag : `tags:${tag}`
                          tag = tag.replace(/\\:/g, ':')
                          return tag
                        })
                        .join(' OR ')})` :
                    ''
                }
              }
            ])
            .then(data => {
              const content = data.results[0]
              dispatch(
                'stopSearching',
                content.hits.map(hit => {
                  const path = hit.url.replace(re, '')

                  let title = Object.keys(hit.hierarchy).sort()

                  if (title.length > 3) title.shift()

                  title = title
                    .filter(key => Boolean(hit.hierarchy[key]))
                    .map(key => hit.hierarchy[key])
                    .join(' > ')
                  return {
                    title,
                    path,
                    id: hit.anchor,
                    content: hit.content
                  }
                })
              )
            })
        }
      }
    })
  }
}
