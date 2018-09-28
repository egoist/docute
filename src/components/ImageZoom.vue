<template>
  <div class="ImageZoom" :class="{'with-border': border}">
    <img ref="img" :src="url" :alt="alt" :width="width" />
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
    },
    width: {
      type: [String, Number]
    }
  },
  mounted() {
    mediumZoom(this.$refs.img, {
      // background: '#333'
    })
  }
}
</script>

<style scoped>
.ImageZoom {
  display: inline-block;
  font-size: 0;
}

.with-border {
  border: 1px solid var(--border-color);
  padding: 10px;
  border-radius: 4px;
}
</style>
