<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import throttle from 'throttleit'
  import { findMax, findMin } from 'utils'
  import { $, $$ } from 'utils/dom'
  import scrollIntoView from 'dom-scroll-into-view'

  export default {
    name: 'app',
    computed: {
      ...mapState(['jumping', 'config', 'activeId'])
    },
    mounted() {
      this.detectClick()
      this.$watch('activeId', () => {
        if (!this.$store.state.config.syncTocPosition) {
          return
        }
        const el = $('.sidebar-heading-anchor.active')
        if (el) {
          if (el.scrollIntoViewIfNeeded) {
            el.scrollIntoViewIfNeeded()
          } else {
            scrollIntoView(
              el,
              $('.sidebar'),
              {
                onlyScrollIfNeeded: true,
                offsetBottom: 100
              }
            )
          }
        }
      })
    },
    methods: {
      ...mapActions(['updateActiveId', 'jumpToId']),
      detectClick() {
        document.addEventListener('click', e => {
          this.handleNavigateAttribute(e)
        })
      },
      handleNavigateAttribute(e) {
        const jumpEl = e.target.closest('[jump-to-id]')
        const id = jumpEl && jumpEl.getAttribute('jump-to-id')
        if (id) {
          e.preventDefault()
          this.$router.push({ query: { ...this.$route.query, id } })
          return this.jumpToId(id)
        }

        const linkEl = e.target.closest('[router-link]')
        const link = linkEl && linkEl.getAttribute('router-link')
        if (link) {
          e.preventDefault()
          return this.$router.push(link)
        }
      }
    }
  }
</script>

<style src="hint.css/hint.css"></style>
<style src="css/github-markdown.css"></style>
<style src="css/nprogress.css"></style>
<style src="css/highlight.css"></style>
<style src="css/markdown.css"></style>
<style src="css/main.css"></style>
