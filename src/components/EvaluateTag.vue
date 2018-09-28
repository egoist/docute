<script>
export default {
  name: 'EvaluateTag',
  props: {
    tag: {
      type: String,
      required: true
    }
  },
  render(h) {
    return h(
      this.tag,
      {
        attrs: this.$attrs
      },
      this.$slots.default
    )
  }
}
</script>
