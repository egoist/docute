import './promise'
import 'isomorphic-fetch'
import {app} from './app'
import 'utils/globals'

// ensure dom is ready
document.addEventListener('DOMContentLoaded', () => {
  app.$mount('#app')
})
