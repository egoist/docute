import './promise'
import 'isomorphic-fetch'
import 'element-closest'
import {app, store} from './app'
import 'utils/globals'

// ensure dom is ready
document.addEventListener('DOMContentLoaded', () => {
  app.$mount('#app')
})
