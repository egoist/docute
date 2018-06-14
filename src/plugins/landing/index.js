import Landing from './Landing.vue'

export default {
  name: 'builtin:landing',
  apply(docute) {
    docute.registerLayout('landing', Landing)
  }
}
