<script>
export default {
  name: 'DocuteRoot',
  render(h) {
    return h(
      'div',
      {
        attrs: {
          id: this.$store.getters.target,
          class: 'Root'
        }
      },
      [h('router-view')]
    )
  },
  created() {
    this.insertStyle()
  },
  computed: {
    css() {
      const {cssVariables} = this.$store.getters
      const content = Object.keys(cssVariables).reduce((res, key) => {
        res += `--${key.replace(/[A-Z]/g, m => `-${m.toLowerCase()}`)}:${
          cssVariables[key]
        };`
        return res
      }, '')
      return `:root{${content}}`
    }
  },
  watch: {
    css() {
      this.insertStyle()
    }
  },
  methods: {
    insertStyle() {
      const ID = 'docute-inserted-style'
      const style = document.createElement('style')
      style.id = ID
      if (style.styleSheet) {
        style.styleSheet.cssText = this.css
      } else {
        style.appendChild(document.createTextNode(this.css))
      }

      const existingStyle = document.getElementById(ID)
      if (existingStyle) {
        document.head.insertBefore(style, existingStyle)
        document.head.removeChild(existingStyle)
      } else {
        document.head.insertBefore(style, document.head.firstChild)
      }
    }
  }
}
</script>

<style src="../css/global.css"></style>
