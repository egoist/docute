<template>
  <div class="page" :class="{'no-sidebar': !showSidebar}">
    <figure class="sidebar" v-if="loaded && (showSidebar || isMobile)">
      <search-box v-if="pluginSearch"></search-box>
      <search-result v-if="pluginSearch && searchResult && searchKeyword"></search-result>
      <header-nav class="is-mobile inner-x"></header-nav>
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
  import SearchBox from 'components/SearchBox.vue'
  import SearchResult from 'components/SearchResult.vue'
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
    data() {
      return {
        isMobile
      }
    },
    created() {
      this.toggleMobileSidebar(false)
      this.fetchData()
    },
    mounted() {
      this.$watch('$route.path', () => {
        this.fetchData()
      })
    },
    computed: {
      ...mapState({
        id: state => state.route.query.id
      }),
      ...mapState(['config', 'page', 'loaded', 'jumping', 'activeId', 'pluginSearch', 'searchResult', 'searchKeyword']),
      ...mapGetters(['documentTitle', 'showSidebar'])
    },
    methods: {
      ...mapActions(['updatePage', 'toggleMobileSidebar', 'jumpToId']),
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
      HeaderNav,
      SearchBox,
      SearchResult
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
    overflow-y: auto;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    padding: 0 0 20px 0;
    background-color: white;
    z-index: 1000;
  }
  .main {
    padding: 20px 0;
    margin-left: 280px;
  }
</style>

<style>
  [class*="is-mobile"] {
    display: none !important;
  }
  @media screen and (min-width: 768px) {
    .no-sidebar {
      .main {
        margin: 0 auto;
        margin-left: auto;
        max-width: 900px;
        border-left: 1px solid rgba(0,0,0,.07);
        border-right: 1px solid rgba(0,0,0,.07);
      }
    }
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
      margin-left: 0;
      padding-top: 70px;
    }
    .sidebar {
      width: calc(100% - 50px);
      padding-top: 50px;
      padding-bottom: 10px;
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
  @media screen and (min-width: 1280px) {
    .main {
      max-width: 1000px;
      margin: 0 auto;
    }
  }
</style>
