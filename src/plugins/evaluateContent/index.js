export default {
  name: 'hoistTags',
  extend(api) {
    api.extendMarkedRenderer(renderer => {
      const hoistedTagsRe = /^<(script|style)(?=(\s|>|$))/i
      renderer.html = html => {
        html = html.trim()
        if (hoistedTagsRe.test(html)) {
          return html
            .replace(/^<(script|style)/, '<v-$1')
            .replace(/<\/(script|style)>$/, '</v-$1>')
        }
        return html
      }
    })
  }
}
