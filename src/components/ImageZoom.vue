<template>
  <div class="image-preview" :class="{'with-border': border}">
    <img ref="img" :src="url" :alt="alt" />
  </div>
</template>

<script>
import mediumZoom from 'medium-zoom'

export default {
  name: 'ImageZoom',
  props: {
    url: {
      type: String,
      required: true
    },
    alt: {
      type: String
    },
    border: {
      type: Boolean,
      default: true
    }
  },
  mounted() {
    mediumZoom(this.$refs.img)
  }
}
</script>

<style scoped>
.with-border {
  border: 1px solid var(--border-color);
  padding: 10px;
  border-radius: 4px;
}
</style>
