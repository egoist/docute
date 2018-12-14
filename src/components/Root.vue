<script>
export default {
  name: 'DocuteRoot',
  render(h) {
    return h(
      'div',
      {
        attrs: {
          id: this.$store.getters.target
        }
      },
      [h('router-view')]
    )
  }
}
</script>

<style src="../css/global.css"></style>
