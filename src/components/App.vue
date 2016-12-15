<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex'
  import throttle from 'lodash.throttle'
  import {findMax, findMin} from 'utils'
  import {$$} from 'utils/dom'

  export default {
    computed: {
      ...mapState(['jumping'])
    },
    mounted() {
      this.scrollSpy()
      this.detectClick()
    },
    methods: {
      ...mapActions(['updateActiveId', 'jumpToId']),
      scrollSpy() {
        const handleScroll = () => {
          if (this.jumping) return
          const headings = $$('.markdown-toc-heading')
          const els = [...headings].map(heading => {
            return {
              top: heading.getBoundingClientRect().top,
              id: heading.id
            }
          })
          const lastNegative = findMax(els.filter(el => el.top < 0), 'top')[0]
          const firstPositive = findMin(els.filter(el => el.top > 0), 'top')[0]

          let el = {}
          if (lastNegative && firstPositive && firstPositive.top > 200) {
            el = lastNegative
          } else if (firstPositive) {
            el = firstPositive
          }
          if (el.id) this.updateActiveId(el.id)
        }

        document.addEventListener('scroll', throttle(handleScroll, 300))
      },
      detectClick() {
        document.addEventListener('click', e => {
          const el = e.target
          const id = el.getAttribute('jump-to-id')
          if (id) {
            return this.jumpToId(id)
          }
          const link = el.getAttribute('router-link')
          if (link) {
            return this.$router.push(link)
          }
        })
      }
    }
  }
</script>
