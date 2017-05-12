<template>
  <component
    class="landing"
    v-if="content.component"
    :is="content.component" />
  <div
    class="landing"
    v-else-if="content.html"
    v-html="content.html"></div>
</template>

<script>
  import { mapState } from 'vuex'
  import parseResource from 'utils/parse-resource'

  export default {
    name: 'landing',
    data() {
      return {
        content: {
          html: null,
          component: null
        }
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
        this.content = await parseResource(this.config.landing, {
          fallback: 'landing.html',
          componentName: 'custom-landing',
          marked: {
            context: {
              path: this.$route.path,
              routerMode: this.$router.mode
            }
          }
        })
      }
    }
  }
</script>

<style>
</style>
