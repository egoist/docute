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
                <ContentShell />
              </div>
          </div>
    </template>
  </div>
</template>

<script>
import jump from 'jump.js'
import { mapState, mapGetters, mapMutations } from 'vuex'
import progress from 'nprogress'

import ContentShell from './ContentShell.vue'
import ErrorContainer from './ErrorContainer.vue'
import Header from './Header.vue'
import Sidebar from './Sidebar.vue'
import headingsPlugin from '../markdown/headings'
import highlightLinesPlugin from '../markdown/highlight-lines'
import escapeInterpolationPlugin from '../markdown/escape-interpolation'
import linkPlugin from '../markdown/link'
import hoistPlugin from '../markdown/hoist'
import checkNetlify from '../utils/check-netlify'
import getMarkdownRenderer from '../utils/get-markdown-renderer'

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
      let filepath

      if (typeof this.siteConfig.getSource === 'function') {
        filepath = this.siteConfig.getSource(route)
      }

      if (!filepath) {
        filepath = `${this.siteConfig.sourceRoot}${route.params[0]}`
        const endsWithSlash = /\/$/.test(filepath)
        if (endsWithSlash) {
          filepath += this.siteConfig.indexFile
        } else {
          filepath += '.md'
        }
      }

      progress.start()
      let content
      try {
        content = await fetch(filepath).then(res => {
          if (!res.ok) {
            throw res
          }
          checkNetlify(res)
          return res.text()
        })
      } catch (err) {
        this.error = err
        progress.done()
        console.error(err)
        return
      }

      const md = await getMarkdownRenderer()

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
              // No, it's not evil
              // eslint-disable-next-line no-new-func
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
    ContentShell
  }
}
</script>

<style src="../css/vars.css">
</style>
<style src="../css/prism.css">
</style>
<style src="../css/progress.css">
</style>
<style src="../css/global.css">
</style>
<style src="../css/markdown.css">
</style>

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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
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
