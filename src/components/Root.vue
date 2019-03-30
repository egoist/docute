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
      if (this.$ssrContext) {
        this.$ssrContext.insertedStyle = this.css
        return
      }

      const ID = 'docute-inserted-style'
      let style = document.getElementById(ID)

      if (style) {
        style.innerHTML = this.css
      } else {
        style = document.createElement('style')
        style.id = ID
        style.innerHTML = this.css
        document.head.insertBefore(style, document.head.firstChild)
      }
    }
  }
}
</script>

<style src="../css/global.css"></style>
