<template>
  <div class="Page">
    <Sidebar />
    <SidebarMask />
    <MobileHeader />
    <div
      class="Main"
      :class="{
        'is-center': $store.getters.config.centerContent
      }"
      v-if="$store.state.fetchingFile">
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
    <div
      class="Main"
      :class="{
        'is-center': $store.getters.config.centerContent
      }"
      v-else>
      <InjectedComponents position="main:start" />
      <component :is="MarkdownBody" />
      <EditLink />
      <PrevNextLinks />
      <InjectedComponents position="main:end" />
    </div>
    <Rightbar />
  </div>
</template>

<script>
import jump from 'jump.js'
import {ContentLoader} from 'vue-content-loader'
import Sidebar from '../components/Sidebar.vue'
import SidebarMask from '../components/SidebarMask.vue'
import MobileHeader from '../components/MobileHeader.vue'
import PrevNextLinks from '../components/PrevNextLinks.vue'
import EditLink from '../components/EditLink.vue'
import Rightbar from '../components/Rightbar.vue'
import hooks from '../hooks'

export default {
  name: 'PageHome',

  components: {
    ContentLoader,
    Sidebar,
    SidebarMask,
    MobileHeader,
    PrevNextLinks,
    EditLink,
    Rightbar
  },

  created() {
    this.fetchFile()
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
    MarkdownBody() {
      const {componentMixins} = this.$store.getters.config
      const component = {
        mixins: componentMixins || [],
        name: 'MarkdownBody',
        template: `<div class="markdown-body">${this.$store.state.html}</div>`
      }

      hooks.process('extendMarkdownComponent', component)

      return component
    }
  },

  methods: {
    async fetchFile(path) {
      if (typeof path === 'undefined') {
        path = this.$route.path
      }
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
          jump(el, {
            duration: 0,
            offset: document.body.clientWidth < 768 ? -60 : -10
          })
        }
      }
    }
  }
}
</script>

<style src="../css/prism.css">
</style>
<style src="../css/markdown.css">
</style>

<style scoped>
.Docute {
  display: flex;
}

.Main {
  margin-left: 250px;
  max-width: 800px;
  padding: 20px 80px 80px;

  &.is-center {
    margin: 0 auto;
    margin-left: auto;
  }
}
</style>

<style scoped>
@import 'vars.css';

@media screen and (max-width: 1300px) {
  .Main.is-center {
    margin-left: 250px;
  }
}

@media screen and (max-width: 768px) {
  .Main,
  .Main.is-center {
    padding: 40px 20px;
    margin-left: 0;
    max-width: 100%;
    margin-top: var(--mobile-header-height);
  }
}
</style>
