<template>
  <div class="Page">
    <SiteHeader />
    <div
      class="Wrap"
      :class="{
        'is-center': $store.getters.centerContent
      }"
    >
      <Sidebar />
      <SidebarMask />
      <div class="Main" v-if="$store.state.fetchingFile">
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
      <div class="Main" v-else>
        <InjectedComponents position="main:start" />
        <component :is="MarkdownTitle" class="page-title" />
        <component :is="MarkdownBody" />
        <EditLink />
        <PrevNextLinks />
        <InjectedComponents position="main:end" />
      </div>
    </div>
  </div>
</template>

<script>
import jump from 'jump.js'
import {ContentLoader} from 'vue-content-loader'
import Sidebar from '../components/Sidebar.vue'
import SidebarMask from '../components/SidebarMask.vue'
import SiteHeader from '../components/Header.vue'
import PrevNextLinks from '../components/PrevNextLinks.vue'
import EditLink from '../components/EditLink.vue'
import hooks from '../hooks'

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
      this.jumpToHash()
    },
    '$store.state.page.title'(title) {
      const {path} = this.$route
      const {config, homePaths} = this.$store.getters
      if (homePaths.indexOf(path) > -1) {
        document.title = config.title
      } else {
        document.title = `${title} - ${config.title}`
      }
    }
  },

  computed: {
    MarkdownTitle() {
      return {
        name: 'MarkdownTitle',
        template: `<h1>${this.$store.state.page.title}</h1>`
      }
    },

    MarkdownBody() {
      const {componentMixins} = this.$store.getters.config
      const component = {
        mixins: componentMixins || [],
        name: 'MarkdownBody',
        template: `<div class="markdown-body">${
          this.$store.state.page.content
        }</div>`
      }

      hooks.process('extendMarkdownComponent', component)

      return component
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
@import 'vars.css';

.Docute {
  display: flex;
}

.Main {
  margin-left: 250px;
  padding: 30px 20px 80px 80px;
  margin-top: var(--header-height);

  @media (max-width: 768px) {
    padding: 40px 20px;
    margin-left: 0;
    max-width: 100%;
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
