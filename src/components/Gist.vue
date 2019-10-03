<template>
  <div v-if="html" v-html="html"></div>
  <Loading v-else />
</template>

<script>
export default {
  name: 'Gist',

  props: {
    id: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      html: ''
    }
  },

  mounted() {
    window[`gist_callback_${this.id}`] = gist => {
      const link = document.createElement('link')
      link.href = gist.stylesheet
      link.rel = 'stylesheet'
      document.head.appendChild(link)
      this.html = gist.div
    }
    const script = document.createElement('script')
    script.src = `https://gist.github.com/egoist/${this.id}.json?callback=gist_callback_${this.id}`
    document.head.appendChild(script)
  }
}
</script>

<style>
.gist table td {
  border-bottom: none;
}
</style>
