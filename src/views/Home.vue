<template>
  <div class="page">
    <figure class="sidebar" v-if="loaded">
      <header-nav class="is-mobile"></header-nav>
      <toc :headings="page.headings"></toc>
    </figure>
    <mobile-header v-if="loaded"></mobile-header>
    <section class="main">
      <home-header v-if="loaded"></home-header>
      <div class="markdown-body content" v-html="page.html"></div>
    </section>
  </div>
</template>

<script>
  import HomeHeader from 'components/HomeHeader.vue'
  import MobileHeader from 'components/MobileHeader.vue'
  import HeaderNav from 'components/HeaderNav.vue'
  import Toc from 'components/Toc.vue'
  import highlight from 'utils/highlight'
  import frontMatter from 'utils/front-matter'
  import {mapState, mapGetters, mapActions} from 'vuex'
  import nprogress from 'nprogress'
  import {inBrowser, $, $$, isMobile} from 'utils/dom'
  import marked from 'utils/marked'
  import LinkIcon from '!raw-loader!svg/link.svg'

  marked.setOptions({
    highlight(code, lang) {
      if (lang === 'markdown') {
        const parsed = frontMatter(code)
        const markdown = highlight.highlight('markdown', parsed.body).value
        if (!parsed.frontmatter) return markdown
        const yaml = highlight.highlight('yaml', parsed.frontmatter).value
        return `<span class="hljs-comment">---</span>\n${yaml}\n<span class="hljs-comment">---</span>\n${markdown}`
      }

      const isValid = !!(lang && highlight.getLanguage(lang))
      if (isValid) return highlight.highlight(lang, code).value
      return highlight.highlightAuto(code).value
    }
  })

  export default {
    name: 'home',
    created() {
      this.toggleSidebar(false)
      this.fetchData()
    },
    mounted() {
      this.$watch('$route.path', () => {
        this.fetchData()
      })
    },
    computed: {
      ...mapState({
        id: state => state.route.query.id,
        config: state => state.config,
        page: state => state.page,
        loaded: state => state.loaded,
        jumping: state => state.jumping,
        activeId: state => state.activeId
      }),
      ...mapGetters(['documentTitle'])
    },
    methods: {
      ...mapActions(['updatePage', 'toggleSidebar', 'jumpToId']),
      async fetchData() {
        nprogress.start()

        const renderer = new marked.Renderer()

        let headings = []
        renderer.heading = (text, level) => {
          const index = headings.length
          let slug = text.replace(/[:\/\?#\[\]@!$&'()*+,;=\\%<>\|\^~£"]/g, '')
            // Replace dots and spaces with a sepeator
            .replace(/(\s|\.)/g, '-')
            // Convert 2 or more sepeators into just one sepeator
            .replace(/-+/g, '-')
            // Make the whole thing lowercase
            .toLowerCase()

          // check if there's already a same slug
          const sameSlugs = headings.filter(heading => {
            return heading.slug === slug
          })
          if (sameSlugs.length > 0) {
            slug += sameSlugs.length
          }
          if (level !== 1) {
            headings.push({level, text, slug, index})
          }
          const className = level === 1 ? 'markdown-heading' : 'markdown-heading markdown-toc-heading'
          const anchor = level === 1 ? '' : ` <span class="anchor" jump-to-id="${slug}">${LinkIcon}</span>`
          return `<h${level} id="${slug}" class="${className}">
              ${anchor}
              ${text}
            </h${level}>`
        }
        renderer.link = (href, title, text) => {
          const getTitle = title ? ` title="${title}"` : ''
          return `<a target="_blank" href="${href}"${getTitle}>${text}</a>`
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

        const res = await fetch(file)
        nprogress.inc()

        if (res.status === 404) {
          this.$router.replace('/404')
          return
        }

        const text = await res.text()

        const parsed = frontMatter(text)

        this.updatePage({
          html: marked(parsed.body, {renderer}),
          attributes: parsed.attributes,
          headings: this.handleRelation(headings)
        })

        document.title = this.documentTitle

        // scroll to id (the url query `id`)
        this.$nextTick(() => {
          nprogress.done()
          if (this.id) {
            this.jumpToId(this.id)
          }
        })
      },
      handleRelation(array) {
        function getParent(parentLevel, end) {
          const filtered = array
            .slice(0, end)
            .filter(item => item.level === parentLevel)
          const nearest = filtered[filtered.length - 1]
          return nearest && nearest.index
        }
        return array.map((item, index) => {
          if (item.level > 2) {
            item.parent = getParent(item.level - 1, index)
          }
          return item
        })
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
<style src="css/markdown.css"></style>
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
    text-rendering: geometricPrecision;
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
    z-index: 1000;
  }
  .main {
    padding: 20px 0;
    padding-left: 280px;
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
      padding-left: 0;
      padding-top: 70px;
    }
    .sidebar {
      width: calc(100% - 50px);
      padding: 10px;
      padding-top: 60px;
      top: 0;
      border-right: none;
      box-shadow: 0 0 10px rgba(0,0,0,0.2);
      transform: translateX(-120%);
      transition: transform .3s cubic-bezier(0.4, 0, 0, 1);
      &.visible {
        transform: translateX(0);
      }
    }
  }
</style>
