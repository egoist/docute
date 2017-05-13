<template>
  <div class="page" :class="{'no-sidebar': !showSidebar}">
    <sidebar-toggle v-if="!isMobile && !config.disableSidebarToggle"></sidebar-toggle>
    <figure ref="sidebar" class="sidebar" v-if="loaded && (showSidebar || isMobile)">
      <search-box v-if="pluginSearch"></search-box>
      <search-result v-if="pluginSearch && searchResult && searchKeyword"></search-result>
      <custom-components place="sidebar:start" v-if="loaded"></custom-components>
      <header-nav
        :has-nav="hasNav"
        :show-nav="showNav"
        :current-nav="currentNav"
        class="is-mobile inner-x">
      </header-nav>

      <custom-toc v-if="showCustomToc" :toc="showToc" />
      <toc v-else-if="showToc" :headings="page.headings" />

      <custom-components place="sidebar:end" v-if="loaded"></custom-components>
    </figure>
    <mobile-header :current-icons="currentIcons" v-if="loaded"></mobile-header>
    <section class="main">
      <home-header
        :current-icons="currentIcons"
        :has-nav="hasNav"
        :show-nav="showNav"
        v-if="loaded"></home-header>
      <custom-components place="content:start" v-if="loaded"></custom-components>
      <component v-if="docComponent" :is="docComponent" />
      <div v-else class="markdown-body content" v-html="page.html"></div>
      <custom-components place="content:end" v-if="loaded"></custom-components>
    </section>
  </div>
</template>

<script>
  import urlResolve from 'url-resolve'
  import HomeHeader from 'components/HomeHeader.vue'
  import MobileHeader from 'components/MobileHeader.vue'
  import HeaderNav from 'components/HeaderNav.vue'
  import Toc from 'components/Toc.vue'
  import SearchBox from 'components/SearchBox.vue'
  import SearchResult from 'components/SearchResult.vue'
  import SidebarToggle from 'components/SidebarToggle.vue'
  import CustomComponents from 'components/CustomComponents'
  import CustomToc from 'components/CustomToc'
  import highlight from 'utils/highlight'
  import frontMatter from 'utils/front-matter'
  import { mapState, mapGetters, mapActions } from 'vuex'
  import nprogress from 'nprogress'
  import { isMobile } from 'utils/dom'
  import marked from 'utils/marked'
  import renderer from 'utils/marked-renderer'
  import LinkIcon from '!raw-loader!svg/link.svg'
  import slugify from 'utils/slugify'
  import event from 'utils/event'
  import { isType, fetchCredentials } from 'utils'
  import componentManager from 'utils/component-manager'
  import parsers from 'utils/parsers'

  marked.setOptions({
    highlight(code, lang) {
      if (lang === 'markdown') {
        const parsed = frontMatter(code)
        const markdown = highlight(parsed.body, 'markdown')
        if (!parsed.frontmatter) {
          return markdown
        }
        const yaml = highlight(parsed.frontmatter, 'yaml')
        return `<span class="token comment">---</span>\n${yaml}\n<span class="token comment">---</span>\n${markdown}`
      }

      return highlight(code, lang)
    }
  })

  export default {
    name: 'page',
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
      this.$watch('$route.path', () => this.fetchData())
      event.on('reload', () => this.fetchData())
    },
    computed: {
      ...mapState({
        id: state => state.route.query.id
      }),
      ...mapState(['config', 'page', 'loaded', 'jumping', 'activeId', 'pluginSearch', 'searchResult', 'searchKeyword']),
      ...mapGetters(['documentTitle', 'showSidebar', 'currentNav', 'showToc', 'showCustomToc', 'currentNavItem']),
      currentNavSource() {
        const route = this.$route
        const config = this.config

        const matchedSource = this.currentNavItem && this.currentNavItem.source
        const homeSource = route.meta && (route.meta.name === 'home') && (config.home || './README.md')

        const defaultSource = /\/$/.test(route.path) ? ('.' + route.path + 'README.md') : ('.' + route.path + '.md')
        const source = matchedSource || homeSource || defaultSource

        if (/^https?:\/\//.test(source)) {
          return source
        }
        // You will need to set `url` if using history mode
        return urlResolve(config.url || '.', source)
      },
      currentIcons() {
        const { state } = this.$store
        const defaultIcons = []

        const {
          disableDefaultIcons,
          icons = [],
          'edit-link': editLink,
          repo,
          twitter
        } = state.config

        const { attributes } = state.page

        if (!disableDefaultIcons) {
          if (editLink) {
            const isExternal = /^https?:\/\//.test(this.currentNavSource)
            const source = isExternal ?
              this.currentNavSource :
              urlResolve(editLink, this.currentNavSource)
            defaultIcons.push({
              link: source,
              label: isExternal ? 'View page source' : 'Edit this page',
              icon: 'edit'
            })
          }
          if (repo) {
            defaultIcons.push({
              link: `https://github.com/${repo}`,
              label: 'Star me on GitHub',
              icon: 'github'
            })
          }
          if (twitter) {
            defaultIcons.push({
              link: `https://twitter.com/${twitter}`,
              label: 'Follow me on Twitter',
              icon: 'twitter'
            })
          }
        }

        let currentIcons
        if (isType(icons, 'Object') && attributes) {
          currentIcons = icons[attributes.icons] || icons.default
        } else {
          currentIcons = icons.default || icons
        }

        return defaultIcons.concat(currentIcons)
      },
      hasNav() {
        return this.currentNav && this.currentNav.length > 0
      },
      showNav() {
        const hasNavStart = componentManager.count('nav:start') > 0
        const hasNavEnd = componentManager.count('nav:end') > 0
        return this.hasNav || hasNavStart || hasNavEnd
      },
      docComponent() {
        if (!this.currentNavItemComponent) return

        return {
          name: 'custom-page',
          ...this.currentNavItemComponent,
          template: `<div class="doc-component markdown-body content">${this.page.html}</div>`
        }
      },
      currentNavItemComponent() {
        return this.currentNavItem && this.currentNavItem.component
      }
    },
    methods: {
      ...mapActions(['updatePage', 'toggleMobileSidebar', 'jumpToId']),
      async fetchData() {
        nprogress.start()

        const headings = []
        renderer.heading = (text, level) => {
          const index = headings.length
          const directSlug = this.config.slugify ? this.config.slugify(text) : slugify(text)
          let slug = directSlug

          // check if there's already a same slug
          const sameSlugs = headings.filter(heading => {
            return heading.directSlug === directSlug
          })
          if (sameSlugs.length > 0) {
            slug += sameSlugs.length
          }

          if (level !== 1) {
            headings.push({ level, text, slug, directSlug, index })
          }

          const className = level === 1 ? 'markdown-heading' : 'markdown-heading markdown-toc-heading'
          const anchor = level === 1 ? '' : ` <span class="anchor" jump-to-id="${slug}">${LinkIcon}</span>`
          return `<h${level} id="${slug}" class="${className}">
              ${anchor}
              ${text}
            </h${level}>`
        }

        let text

        if (this.currentNavItem && this.currentNavItem.markdown) {
          text = this.currentNavItem.markdown
        } else {
          const res = await fetch(this.currentNavSource, {
            credentials: fetchCredentials(this.currentNavSource)
          })
          nprogress.inc()

          if (res.status === 404) {
            this.$router.replace('/404')
            return
          }

          text = await res.text()
        }

        const parsed = frontMatter(text)

        marked.setOptions({
          ...this.config.marked,
          renderer,
          context: {
            path: this.$route.path,
            routerMode: this.$router.mode
          }
        })

        this.updatePage({
          html: parsers.parse(parsed.body, marked),
          attributes: parsed.attributes,
          headings: this.handleRelation(headings)
        })

        document.title = this.documentTitle

        // scroll to id (the url query `id`)
        setTimeout(() => {
          nprogress.done()
          event.emit('content:updated', this)
          if (this.id) {
            this.jumpToId(this.id)
          } else {
            window.scroll(0, 0)
          }
          // reset scrollTop of sidebar
          if (this.$refs.sidebar) {
            this.$refs.sidebar.scrollTop = 0
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
      SearchResult,
      SidebarToggle,
      CustomComponents,
      CustomToc
    }
  }

</script>

<style>
  .page {
    position: absolute;
    top: 0;
    left: 280px;
    right: 0;
    bottom: 0;

    &.no-sidebar {
      left: 0;
    }
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
    padding: 0 0 70px 0;
    background-color: white;
    z-index: 1000;
  }
  .main {
    margin: 0 auto;
    padding-bottom: 20px;
    padding-top: 40px;
    background-color: white;
    max-width: 1000px;
    min-height: 100vmin;
  }
  .content {
    padding-top: 20px;
    margin-top: 20px;
  }
</style>

<style>
  [class*="is-mobile"] {
    display: none !important;
  }
  @media screen and (min-width: 768px) {
    .no-sidebar {
      .main {
        padding-bottom: 50px;
        border: 1px solid rgba(0,0,0,.07);
        border-top: none;
        border-radius: 0 0 4px 4px;
        margin-bottom: 40px;
      }
    }
  }
  @media screen and (max-width: 768px) {
    .main {
      padding-top: 50px;
    }
    .is-desktop {
      display: none !important;
    }
    .is-mobile {
      display: block !important;
    }
    .is-mobile-flex {
      display: flex !important;
    }
    .page {
      left: 0;
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
      /* Enable scroll with momentum on iOS devices */
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;

      &.visible {
        transform: translateX(0);
      }
    }
  }
</style>
