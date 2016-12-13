import './promise'
import {app} from './app'

// ensure dom is ready
document.addEventListener('DOMContentLoaded', () => {
  app.$mount('#app')
})
