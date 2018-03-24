import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default config => new Vuex.Store({
  state: {
    config
  }
})
