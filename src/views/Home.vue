<template>
  <div
    class="Page"
    :class="{[`layout-${$store.getters.config.layout}`]: true}"
    :style="cssVariables"
  >
    <SiteHeader />
    <div class="Wrap">
      <Sidebar />
      <SidebarMask />
      <div class="Main">
        <div class="Content" v-if="$store.state.fetchingFile">
          <content-loader
            :height="160"
            :width="400"
            :speed="2"
            primaryColor="#f3f3f3"
            secondaryColor="#ecebeb"
          >
            <rect x="0" y="5" rx="4" ry="4" width="117" height="6.4" />
            <rect x="0" y="25" rx="3" ry="3" width="85" height="6.4" />
            <rect x="0" y="60" rx="3" ry="3" width="350" height="6.4" />
            <rect x="0" y="80" rx="3" ry="3" width="380" height="6.4" />
            <rect x="0" y="100" rx="3" ry="3" width="201" height="6.4" />
          </content-loader>
        </div>
        <div class="Content" v-else>
          <InjectedComponents position="main:start" />
          <component v-if="pageTitle" :is="MarkdownTitle" class="page-title" />
          <component
            :class="{'has-page-title': pageTitle}"
            :is="MarkdownBody"
          />
          <EditLink />
          <PrevNextLinks />
          <InjectedComponents position="main:end" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import jump from 'jump.js'
import {ContentLoader} from 'vue-content-loader'
import Sidebar from '../components/Sidebar.vue'
import SidebarMask from '../components/SidebarMask.vue'
import SiteHeader from '../components/Header.vue'
import PrevNextLinks from '../components/PrevNextLinks.vue'
import EditLink from '../components/EditLink.vue'
import hooks from '../hooks'
import defaultCssVariables from '../utils/cssVariables'

export default {
  name: 'PageHome',

  components: {
    ContentLoader,
    Sidebar,
    SidebarMask,
    SiteHeader,
    PrevNextLinks,
    EditLink
  },

  mounted() {
    this.fetchFile(this.$route.path)
  },

  beforeRouteUpdate(to, from, next) {
    next()
    if (to.path !== from.path) {
      this.fetchFile(to.path)
    }
  },

  watch: {
    '$route.hash'() {
      this.$nextTick(() => {
        this.jumpToHash()
      })
    },
    pageTitle(newValue) {
      const {path} = this.$route
      const {config, homePaths} = this.$store.getters

      if (homePaths.indexOf(path) > -1) {
        document.title = config.title
      } else {
        const div = document.createElement('div')
        div.innerHTML = newValue
        const title = div.textContent
        document.title = `${title} - ${config.title}`
      }
    }
  },

  computed: {
    pageTitle() {
      return this.$store.state.page.title
    },

    MarkdownTitle() {
      return {
        name: 'MarkdownTitle',
        template: `<h1>${this.pageTitle}</h1>`
      }
    },

    MarkdownBody() {
      const {env} = this.$store.state
      const {componentMixins = []} = this.$store.getters.config
      const component = {
        mixins: [
          ...componentMixins,
          ...env.mixins.map(mixin => {
            // eslint-disable-next-line no-new-func
            const fn = new Function('Vue', `return ${mixin.trim()}`)
            return fn(Vue)
          })
        ],
        name: 'MarkdownBody',
        template: `<div class="markdown-body">${
          this.$store.state.page.content
        }</div>`
      }

      hooks.process('extendMarkdownComponent', component)

      return component
    },

    cssVariables() {
      const vars = {
        ...defaultCssVariables,
        ...this.$store.getters.config.cssVariables
      }
      return Object.keys(vars).reduce((res, key) => {
        res[`--${key.replace(/[A-Z]/g, m => `-${m.toLowerCase()}`)}`] =
          vars[key]
        return res
      }, {})
    }
  },

  methods: {
    async fetchFile(path) {
      await this.$store.dispatch('fetchFile', path)
      hooks.invoke('onContentWillUpdate', this)
      await this.$nextTick()
      hooks.invoke('onContentUpdated', this)
      this.jumpToHash()
    },

    jumpToHash() {
      const {hash} = this.$route
      if (hash) {
        const el = document.querySelector(hash)
        if (el) {
          const header = document.querySelector('.Header')
          jump(el, {
            a11y: true,
            duration: 0,
            offset: -(header.clientHeight + 30)
          })
        }
      }
    }
  }
}
</script>

<style src="../css/prism.css"></style> <style src="../css/markdown.css"></style>

<style scoped>
.Docute {
  display: flex;
}

.Main {
  padding-left: var(--sidebar-width);
  padding-top: calc(var(--header-height) + 30px);
  padding-bottom: 2rem;

  @media screen and (max-width: 768px) {
    padding-left: 0;
  }
}

.Content {
  padding: 0 20px 0 80px;

  @media screen and (max-width: 768px) {
    padding: 0 20px;
  }
}

.layout-wide .Content {
  max-width: 750px;
  margin: 0 auto;
  padding: 0 2.5rem;

  @media screen and (max-width: 768px) {
    max-width: 100%;
    padding: 0 20px;
  }
}

.page-title {
  font-size: 3rem;
  margin: 0;
  margin-bottom: 1.4rem;
  font-weight: 300;
  line-height: 1.1;
}
</style>
