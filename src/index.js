import 'element-closest'
import {app} from './app'
import 'utils/globals'

// ensure dom is ready
document.addEventListener('DOMContentLoaded', () => {
  app.$mount('#app')
})
