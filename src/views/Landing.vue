<template>
  <component v-if="component" :is="component" />
  <div class="landing" v-else v-html="html"></div>
</template>

<script>
  import marked from 'utils/marked'
  import { mapState } from 'vuex'
  import nprogress from 'nprogress'

  export default {
    name: 'landing',
    data() {
      return {
        html: '',
        component: null
      }
    },
    computed: {
      ...mapState(['config'])
    },
    created() {
      this.fetchLanding()
    },
    methods: {
      async fetchLanding() {
        let text
        let html
        let source
        let component
        /**
        * string: using as file path
        * object:
        *   {source}: use as file path
        *   {markdown}: use as markdown and parse to html
        *   {html}: use as html directly
        *   {any + component}: use as component's template
        */

        let landing = this.config.landing
        if (landing === true) landing = 'landing.html'
        if (typeof landing === 'string') {
          source = landing
        } else if (typeof landing === 'object' && landing.source) {
          source = landing.source
        }

        if (source) {
          nprogress.start()
          const res = await fetch(source)
          nprogress.done()

          if (res.status === 404) {
            throw new Error(`${landing} not found`)
          }

          text = await res.text()
          html = /\.html$/.test(source) ? text : marked(text)
        }

        if (typeof landing === 'object') {
          if (landing.markdown) {
            text = landing.markdown
            html = marked(text)
          } else if (landing.html) {
            html = landing.html
          }
          if (landing.component) {
            component = {
              name: 'custom-landing',
              ...landing.component,
              template: `<div class="landing">${html}</div>`
            }
          }
        }

        if (component) {
          this.component = component
        } else if (html) {
          this.html = html
        }
      }
    }
  }
</script>

<style>
</style>
