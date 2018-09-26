<template>
  <div class="Page">
    <Sidebar />
    <SidebarMask />
    <MobileHeader />
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
      <component :is="MarkdownBody" />
      <EditLink />
      <PrevNextLinks />
    </div>
  </div>
</template>

<script>
import jump from 'jump.js'
import { ContentLoader } from 'vue-content-loader'
import Sidebar from '../components/Sidebar.vue'
import SidebarMask from '../components/SidebarMask.vue'
import MobileHeader from '../components/MobileHeader.vue'
import PrevNextLinks from '../components/PrevNextLinks.vue'
import EditLink from '../components/EditLink.vue'

export default {
  name: 'PageHome',

  components: {
    ContentLoader,
    Sidebar,
    SidebarMask,
    MobileHeader,
    PrevNextLinks,
    EditLink
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
    }
  },

  computed: {
    MarkdownBody() {
      return {
        name: 'MarkdownBody',
        template: `<div class="markdown-body">${this.$store.state.html}</div>`
      }
    }
  },

  methods: {
    async fetchFile(path) {
      if (typeof path === 'undefined') {
        path = this.$route.path
      }
      await this.$store.dispatch('fetchFile', path)
      await this.$nextTick()
      this.jumpToHash()
    },

    jumpToHash() {
      const { hash } = this.$route
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

<style src="../css/prism.css"></style>
<style src="../css/markdown.css"></style>

<style scoped>
.Docute {
  display: flex;
}

.Main {
  margin-left: 250px;
  max-width: 800px;
  padding: 20px 80px 80px;
}
</style>

<style scoped>
@import "vars.css";

@media screen and (max-width: 768px) {
  .Main {
    padding: 40px 20px;
    margin-left: 0;
    max-width: 100%;
    margin-top: var(--mobile-header-height);
  }
}
</style>
