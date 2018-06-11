<template>
  <div class="page">
    <Header :title="siteConfig.title" />
    <ErrorContainer v-if="error" :error="error" />
    <template v-else>
      <div class="sidebar-overlay" @click="toggleSidebar"></div>
          <Sidebar :headings="headings" />
          <div class="docute-page">
              <div class="docute-content" v-if="docComponent">
                <div class="page-meta">
                  <h1 class="page-title">{{ meta.title }}</h1>
                  <div class="page-subtitle" v-if="meta.subtitle" v-html="meta.subtitle"></div>
                </div>
                <div ref="hoistedTags" v-if="hoistedTags.length > 0">
                  <div
                    v-for="(tag, index) of hoistedTags"
                    v-html="tag.content"
                    :key="index">
                  </div>
                </div>
                <component :is="docComponent" />
              </div>
              <div class="docute-content docute-content-loader" v-else>
                <ContentLoader
                  :height="475"
                  :width="400"
                  :speed="2"
                  primaryColor="#f3f3f3"
                  secondaryColor="#ecebeb">
                  <rect x="0" y="12" rx="3" ry="3" width="125" height="12" />
                  <rect x="0" y="30.8" rx="3" ry="3" width="206" height="8" />
                  <rect x="0" y="88.8" rx="3" ry="3" width="173" height="10" />
                  <rect x="0" y="110.8" rx="3" ry="3" width="260" height="6" />
                  <rect x="0" y="120.8" rx="3" ry="3" width="300" height="6" />
                  <rect x="0" y="130.8" rx="3" ry="3" width="235" height="6" />
                </ContentLoader>
              </div>
          </div>
    </template>
  </div>
</template>

<script>
import jump from 'jump.js'
import { mapState, mapGetters, mapMutations } from 'vuex'
import progress from 'nprogress'
import { ContentLoader } from 'vue-content-loader'

import ErrorContainer from './ErrorContainer.vue'
import Header from '../components/Header.vue'
import Sidebar from '../components/Sidebar.vue'
import highlight from '../utils/highlight'
import headingsPlugin from '../markdown/headings'
import highlightLinesPlugin from '../markdown/highlight-lines'
import escapeInterpolationPlugin from '../markdown/escape-interpolation'
import linkPlugin from '../markdown/link'
import hoistPlugin from '../markdown/hoist'

import anchorIcon from '!raw-loader!../svg/anchor.svg'

progress.configure({ showSpinner: false })

export default {
  name: 'page',

  head() {
    let title
    if (this.$route.path === '/' || !this.meta.title) {
      title = this.siteConfig.title
    } else {
      title = `${this.meta.title} - ${this.siteConfig.title}`
    }
    return {
      title,
      bodyAttrs: {
        class: this.sidebarOpen ? 'sidebar-open' : ''
      }
    }
  },

  data() {
    return {
      docComponent: null,
      headings: null,
      hoistedTags: [],
      meta: {},
      error: null
    }
  },

  computed: {
    ...mapState(['sidebarOpen']),
    ...mapGetters(['siteConfig'])
  },

  watch: {
    '$route.hash'() {
      this.jumpToHash()
    },
    '$route.fullPath'() {
      this.toggleSidebar(false)
    }
  },

  methods: {
    ...mapMutations(['toggleSidebar']),

    jumpToHash() {
      const el = this.$route.hash && document.querySelector(this.$route.hash)
      if (!el) return

      const headerHeight = document.querySelector('.docute-header').clientHeight
      jump(el, {
        duration: 0,
        offset: -(headerHeight + 20),
        callback() {
          el.focus()
        }
      })
    },

    async renderPath(route) {
      let filepath = `${this.siteConfig.sourceRoot}${route.params[0]}`
      const endsWithSlash = /\/$/.test(filepath)
      if (endsWithSlash) {
        filepath += this.siteConfig.indexFile
      } else {
        filepath += '.md'
      }

      progress.start()
      let content
      try {
        content = await fetch(filepath).then(res => {
          if (!res.ok) {
            throw res
          }
          return res.text()
        })
      } catch (err) {
        this.error = err
        progress.done()
        console.error(err)
        return
      }

      const Markdown = await this.getMarkdown()

      const md = new Markdown({
        html: true,
        highlight
      })

      md.use(headingsPlugin)
      md.use(highlightLinesPlugin)
      md.use(escapeInterpolationPlugin)
      md.use(linkPlugin)
      md.use(hoistPlugin)

      const env = {
        headings: [],
        hoistedTags: []
      }
      const html = md.render(content, env)

      this.docComponent = {
        name: 'DocComponent',
        template: `<div ref="markdown" class="markdown-body">${html}</div>`,
        mounted: () => {
          // TODO: When hot-reloaded
          // this.$refs.hoistedTags would be undefined
          if (this.$refs.hoistedTags) {
            const scripts = this.$refs.hoistedTags.querySelectorAll('script')
            scripts.forEach(script => {
              const fn = new Function(script.textContent)
              fn()
            })
          }

        }
      }

      this.error = null
      this.meta = {
        title: env.title,
        subtitle: env.subtitle
      }
      this.hoistedTags = env.hoistedTags
      this.headings = env.headings
      progress.done()
    },

    async getMarkdown() {
      if (this.Markdown) return this.Markdown

      const [Markdown] = await Promise.all([
        import(/* webpackChunkName: "markdown" */ 'markdown-it').then(res => res.default),
        import(/* webpackChunkName: "markdown" */ 'prismjs/components/prism-css'),
        import(/* webpackChunkName: "markdown" */ 'prismjs/components/prism-javascript'),
        import(/* webpackChunkName: "markdown" */ 'prismjs/components/prism-markdown'),
        import(/* webpackChunkName: "markdown" */ 'prismjs/components/prism-bash'),
        import(/* webpackChunkName: "markdown" */ 'prismjs/components/prism-typescript'),
      ])
      this.Markdown = Markdown
      return Markdown
    }
  },

  async beforeRouteUpdate(to, from, next) {
    if (to.path !== from.path) {
      await this.renderPath(to)
    }
    next()
  },

  async created() {
    await this.renderPath(this.$route)
    await this.$nextTick()
    this.jumpToHash()
  },

  components: {
    Sidebar,
    Header,
    ErrorContainer,
    ContentLoader
  }
}
</script>

<style src="../css/vars.css"></style>
<style src="../css/prism.css"></style>
<style src="../css/progress.css"></style>
<style src="../css/global.css"></style>
<style src="../css/markdown.css"></style>

<style scoped>
.docute-page {
  margin-top: var(--header-height);
  padding-left: var(--sidebar-width);
}

.docute-content {
  max-width: 740px;
  margin: 0 auto;
  font-size: 17px;
  padding: 10px 0;
}

.docute-content-loader {
  padding-left: var(--padding);
  padding-right: var(--padding);
}

.loading {
  font-size: 18px;
}

.page-meta {
  padding: var(--padding);

  .page-title {
    margin: 0;
  }

  .page-subtitle {
    color: #6d6d6d;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

@media screen and (max-width: 768px) {
  .docute-page {
    padding-left: 0;
  }
}
</style>

<style>
.sidebar-overlay {
  display: none;
}

@media screen and (max-width: 768px) {
  .sidebar-open {
    .sidebar-overlay {
      display: block;
      position: fixed;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      z-index: 1000;
    }
  }
}
</style>
