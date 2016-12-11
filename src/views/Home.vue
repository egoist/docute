<template>
  <div class="page">
    <figure class="sidebar" v-if="loaded">
      <header-nav class="is-mobile"></header-nav>
      <toc :headings="page.headings" :active="sidebarActive"></toc>
    </figure>
    <mobile-header v-if="loaded"></mobile-header>
    <section class="main">
      <home-header v-if="loaded"></home-header>
      <div class="markdown-body content" v-html="page.html"></div>
    </section>
  </div>
</template>

<script>
  import marked from 'marked'
  import axios from 'axios'
  import uid from 'uid'
  import jump from 'jump.js'
  import HomeHeader from 'components/HomeHeader.vue'
  import MobileHeader from 'components/MobileHeader.vue'
  import HeaderNav from 'components/HeaderNav.vue'
  import Toc from 'components/Toc.vue'
  import highlight from 'utils/highlight'
  import frontMatter from 'utils/front-matter'
  import {mapState, mapGetters, mapActions} from 'vuex'
  import nprogress from 'nprogress'
  import {findMin, findMax} from 'utils'
  import throttle from 'lodash.throttle'
  import detectMobileBrowser from 'detect-mobile-browser'

  const detectMobile = detectMobileBrowser(false)

  marked.setOptions({
    highlight(code) {
      return highlight.highlightAuto(code).value
    }
  })

  export default {
    name: 'home',
    data() {
      return {
        sidebarActive: null,
        isMobile: detectMobile.isAny()
      }
    },
    beforeRouteEnter(to, from, next) {
      nprogress.start()
      next()
    },
    created() {
      this.fetchData()
      this.scrollSpy()
      this.$watch('id', val => {
        if (val) this.jumpTo(val)
      })
      this.$watch('$route.path', () => {
        this.fetchData()
      })
    },
    computed: {
      ...mapState({
        id: state => state.route.query.id,
        config: state => state.config,
        page: state => state.page,
        loaded: state => state.loaded
      }),
      ...mapGetters(['documentTitle'])
    },
    methods: {
      ...mapActions(['updatePage']),
      async fetchData() {
        const renderer = new marked.Renderer()

        const headings = []
        renderer.heading = (text, level) => {
          const hash = uid()
          const slug = text.replace(/[:\/\?#\[\]@!$&'()*+,;=\\%<>\|\^~£"]/g, '')
            // Replace dots and spaces with a sepeator
            .replace(/(\s|\.)/g, '-')
            // Convert 2 or more sepeators into just one sepeator
            .replace(/-+/g, '-')
            // Make the whole thing lowercase
            .toLowerCase()
          if (level !== 1) {
            headings.push({level, text, slug, hash})
          }
          return `<h${level} id="${slug}" class="markdown-heading" data-hash="${hash}">${text}</h${level}>`
        }
        renderer.link = (href, title, text) => {
          return `<a target="_blank" href="${href}" title="${title}">${text}</a>`
        }

        let file = './README.md'
        if (this.$route.meta && this.$route.meta.name === 'page') {
          const name = this.$route.params[0]
          if (/\/$/.test(name)) {
            file = `./${name}README.md`
          } else {
            file = `./${name}.md`
          }
        }

        let text
        try {
          text = await axios.get(file).then(res => res.data)
        } catch (err) {
          nprogress.set(0.4)
          if (err.response) {
            if (err.response.status === 404) {
              this.$router.replace('/404')
            }
          }
          return
        }

        nprogress.set(0.6)

        const parsed = frontMatter(text)

        this.updatePage({
          html: marked(parsed.body, {renderer}),
          attributes: parsed.attributes,
          headings
        })

        document.title = this.documentTitle

        nprogress.done()

        // scroll to id (the url query `id`)
        this.$nextTick(() => {
          if (this.id) {
            this.jumpTo(this.id)
          }
        })
      },
      jumpTo(slug) {
        jump(`#${slug}`, {
          duration: 300,
          a11y: true,
          offset: -10
        })
      },
      scrollSpy() {
        const handleScroll = () => {
          const headings = document.querySelectorAll('.markdown-heading')
          const els = [...headings].map(heading => {
            return {
              top: heading.getBoundingClientRect().top,
              slug: heading.id
            }
          })
          const lastNegative = findMax(els.filter(el => el.top < 0), 'top')[0]
          const firstPositive = findMin(els.filter(el => el.top > 0), 'top')[0]

          let el = {slug: ''}
          if (lastNegative && firstPositive && firstPositive.top > 200) {
            el = lastNegative
          } else if (firstPositive) {
            el = firstPositive
          }
          this.sidebarActive = el.slug
        }
        document.addEventListener('scroll', throttle(handleScroll, 200))
      }
    },
    components: {
      HomeHeader,
      MobileHeader,
      Toc,
      HeaderNav
    }
  }

</script>

<style src="css/nprogress.css"></style>
<style src="css/highlight.css"></style>
<style src="github-markdown-css/github-markdown.css"></style>
<style src="hint.css/hint.css"></style>
<style>
  * {
    box-sizing: border-box;
  }
  html, body, #app, .page {
    height: 100%;
  }
  body {
    margin: 0;
    font: 14px/1.4 -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;
  }
  a {
    color: #34495e;
    text-decoration: none;
  }
  .sidebar {
    margin: 0;
    width: 280px;
    border-right: 1px solid rgba(0,0,0,.07);
    overflow: auto;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    padding: 20px;
    background-color: white;
  }
  .main {
    padding: 20px;
    padding-left: 300px;
  }
  .markdown-body {
    .markdown-heading:focus {
      color: #42b983;
      outline: none;
    }
  }
</style>

<style>
  [class*="is-mobile"] {
    display: none !important;
  }
  @media screen and (max-width: 768px) {
    .is-desktop {
      display: none !important;
    }
    .is-mobile {
      display: block !important;
    }
    .is-mobile-flex {
      display: flex !important;
    }
    .main {
      padding-left: 10px;
      padding-right: 10px;
      padding-top: 70px;
    }
    .sidebar {
      width: calc(100% - 50px);
      padding: 10px;
      padding-top: 60px;
      top: 0;
      border-right: none;
      box-shadow: 0 0 10px rgba(0,0,0,0.2);
      transform: translateX(-100%);
      transition: transform .3s cubic-bezier(0.4, 0, 0, 1);
      &.visible {
        transform: translateX(0);
      }
    }
  }
</style>
