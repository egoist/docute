<template>
  <div class="ImageZoom" :class="{'with-border': border}">
    <img ref="img" :src="imageURL" :alt="alt" :width="width" :title="title" />
  </div>
</template>

<script>
export default {
  name: 'ImageZoom',

  props: {
    url: {
      type: String
    },
    src: {
      type: String
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
    },
    title: {
      type: String
    }
  },

  computed: {
    imageURL() {
      return this.src || this.url
    }
  },

  mounted() {
    const mediumZoom = require('medium-zoom').default
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
