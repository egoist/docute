const cssMixin = {
  mounted() {
    const { css } = this.$options
    if (!css) {
      return
    }

    const head = document.head || document.getElementsByTagName('head')[0]
    const style = document.createElement('style')
    style.type = 'text/css'
    style.setAttribute('data-docute-css', true)
    head.appendChild(style)
    if (style.styleSheet) {
      style.styleSheet.cssText = css
    } else {
      style.appendChild(document.createTextNode(css))
    }
    this._headStyle = style
  },

  beforeDestroy() {
    if (this._headStyle) {
      this._headStyle.parentNode.removeChild(this._headStyle)
    }
  }
}

export default Vue => {
  Vue.mixin(cssMixin)
}
