import algoliasearch from 'algoliasearch/lite'
import Logo from './Logo.vue'

module.exports = function ({
  apiKey,
  indexName,
  tags = []
} = {}) {
  return ({store, registerComponent}) => {
    registerComponent('sidebar:start', Logo)
    store.registerModule('pluginSearch', {
      actions: {
        search({commit, dispatch, rootState, getters}, keyword) {
          dispatch('updateSearchKeyword', keyword)
          if (!keyword) {
            dispatch('stopSearching', null)
            return
          }

          dispatch('startSearching')
          const {currentTags} = getters
          const {url} = rootState.config
          const client = algoliasearch('BH4D9OD16A', apiKey);

          client.search([{
            indexName,
            query: keyword,
            params: {
              filters: currentTags.length > 0 ? `(${currentTags.map(name => `tags:${name}`).join(' OR ')})` : ''
            }
          }]).then(data => {
            const content = data.results[0]
            dispatch('stopSearching', content.hits.map(hit => {
              const re = new RegExp(`^${url}/#?`)
              const path = hit.url.replace(re, '')

              let title = Object.keys(hit.hierarchy).sort()

              if (title.length > 3) title.shift()

              title = title.filter(key => !!hit.hierarchy[key])
                .map(key => hit.hierarchy[key])
                .join(' > ')
              return {
                title,
                path,
                id: hit.anchor,
                content: hit.content
              }
            }))
          })
        }
      }
    })
  }
}
