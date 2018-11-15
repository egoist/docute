const getComponent = tag => {
  return {
    functional: true,
    render(h, ctx) {
      return h(tag, ctx.data, ctx.children)
    }
  }
}

export default Vue => {
  Vue.component('v-style', getComponent('style'))
  Vue.component('v-script', getComponent('script'))
}
