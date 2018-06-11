const head = document.head

export default {
  beforeCreate() {
    if (this.$options.css) {
      this.$headStyle = document.createElement('style')
      this.$headStyle.type = 'text/css'
      this.$headStyle.appendChild(document.createTextNode(this.$options.css))
      head.appendChild(this.$headStyle)
    }
  },

  beforeDestroy() {
    if (this.$headStyle) {
      this.$headStyle.parentNode.removeChild(this.$headStyle)
    }
  }
}
