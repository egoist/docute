<template>
  <div class="page" :class="{'no-sidebar': !showSidebar}">
    <sidebar-toggle v-if="!isMobile && !config.disableSidebarToggle"></sidebar-toggle>
    <figure ref="sidebar" class="sidebar" v-if="loaded && (showSidebar || isMobile)">
      <html-content
          :html-file="brandBar.htmlFileLeft"
          :height-px="brandBar.heightPx"
          v-if="brandBar && brandBar.htmlFileLeft"></html-content>
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
      <html-content
          :html-file="brandBar.htmlFileRight"
          :height-px="brandBar.heightPx"
          v-if="brandBar && brandBar.htmlFileRight"></html-content>
      <home-header
          :current-icons="currentIcons"
          :has-nav="hasNav"
          :show-nav="showNav"
          v-if="loaded"></home-header>
      <div class="content-wrap" ref="contentWrap" v-bind:style="scrollingContentHeight">
        <custom-components place="content:start" v-if="loaded"></custom-components>
        <component v-if="docComponent" :is="docComponent" />
        <div v-else class="markdown-body content" v-html="page.html"></div>
        <custom-components place="content:end" v-if="loaded"></custom-components>
      </div>
    </section>
  </div>
</template>

<script>
  import urlResolve from 'url-resolve'
  import HtmlContent from 'components/HtmlContent.vue'
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
  import throttle from 'throttleit'
  import { isMobile, $$ } from 'utils/dom'
  import marked from 'utils/marked'
  import renderer from 'utils/marked-renderer'
  import LinkIcon from '!raw-loader!svg/link.svg'
  import slugify from 'utils/slugify'
  import event from 'utils/event'
  import { isType, fetchCredentials, findMax, findMin } from 'utils'
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
      this.scrollSpy()
    },
    computed: {
      ...mapState({
        id: state => state.route.query.id
      }),
      ...mapState(['config', 'page', 'loaded', 'jumping', 'activeId', 'pluginSearch', 'searchResult', 'searchKeyword']),
      ...mapGetters(['documentTitle', 'showSidebar', 'currentNav', 'showToc', 'showCustomToc', 'currentNavItem', 'brand']),
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
            const isUrl = /^((http|https):\/\/)/.test(repo)
            defaultIcons.push({
              link: isUrl ? repo : `https://github.com/${repo}`,
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
      brandBar() {
        return this.config.brand;
      },
      scrollingContentHeight() {
        if (this.config.brand) {
          var height = parseInt(this.config.brand.heightPx);
          if (!isNaN(height)) {
            return "height: calc(100% - " + (parseInt(this.config.brand.heightPx) + 40) + 'px';
          }
        }
        return "height: calc(100% - 40px)"
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
      ...mapActions(['updatePage', 'toggleMobileSidebar', 'jumpToId', 'updateActiveId']),
      scrollSpy() {
        const handleScroll = () => {
          const name = this.$route.meta && this.$route.meta.name
          const isDocPage = ['home', 'page'].indexOf(name) > -1
          const headings = $$('.markdown-toc-heading')
          if (this.jumping || !isDocPage || headings.length === 0) {
            return
          }
          const els = [...headings].map(heading => {
            return {
              top: heading.getBoundingClientRect().top,
              id: heading.id
            }
          })
          const lastNegative = findMax(els.filter(el => el.top < 0), 'top')[0]
          const firstPositive = findMin(els.filter(el => el.top > 0), 'top')[0]

          let el = {}
          if (lastNegative && firstPositive && firstPositive.top > 100) {
            el = lastNegative
          } else if (firstPositive) {
            el = firstPositive
          } else {
            el = els[els.length - 1]
          }
          if (el.id) {
            this.updateActiveId(el.id)
          }
        }

        this.$refs.contentWrap.addEventListener('scroll', throttle(handleScroll, 300))
      },
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
            this.$refs.contentWrap.scrollTop = 0
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
      CustomToc,
      HtmlContent
    }
  }

</script>

<style>
  .page {
    max-width: 1280px;
    margin: 0 auto;
    display: flex;
  }
  .sidebar {
    margin: 0;
    width: 280px;
    border-right: 1px solid rgba(0,0,0,.07);
    overflow-y: auto;
    padding: 0 0 70px 0;
    background-color: white;
  }
  .main {
    background-color: white;
    height: 100%;
    max-width: 1000px;
    width: calc(100% - 280px);
    margin: 0 auto;
  }
  .content-wrap {
    height: calc(100% - 40px);
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }
  .content {
    padding-top: 20px;
    padding-bottom: 20px;
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
        border: 1px solid rgba(0,0,0,.07);
        border-top: none;
        border-bottom: none;
      }
    }
  }
  @media screen and (min-width: 1280px) {
    .page:not(.no-sidebar) {
      border: 1px solid rgba(0,0,0,.07);
      border-top: none;
      border-bottom: none;
    }
  }
  @media screen and (max-width: 768px) {
    .main {
      width: 100%;
      padding-top: 50px;
      .content-wrap {
        height: 100%;
      }
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
      padding-bottom: 10px;
      top: 50px;
      bottom: 0;
      left: 0;
      position: fixed;
      border-right: none;
      z-index: 1000;
      box-shadow: 0 0 10px rgba(0,0,0,0.2);
      transform: translateX(-120%);
      transition: transform .3s cubic-bezier(0.4, 0, 0, 1);
      /* Enable scroll with momentum on iOS devices */
      -webkit-overflow-scrolling: touch;

      &.visible {
        transform: translateX(0);
      }
    }
  }
</style>
