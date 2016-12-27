<template>
  <div class="landing" v-html="html"></div>
</template>

<script>
  import marked from 'utils/marked'
  import {mapState} from 'vuex'
  import nprogress from 'nprogress'

  export default {
    data() {
      return {
        html: ''
      }
    },
    computed: {
      ...mapState(['config'])
    },
    created() {
      this.fetchLanding()
    },
    methods: {
      fetchLanding() {
        const landing = typeof this.config.landing === 'string' ? this.config.landing : 'landing.html'
        nprogress.start()
        fetch(landing)
          .then(data => {
            nprogress.done()
            if (data.status === 404) {
              throw new Error(`${landing} not found`)
            }
            return data.text()
          })
          .then(data => {
            this.html = /\.html$/.test(landing) ? data : marked(data)
          })
          .catch(err => {
            console.error(err.message)
          })
      }
    }
  }
</script>

<style>
</style>
