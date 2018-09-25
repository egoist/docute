<template>
  <div class="Page">
    <Sidebar />
    <SidebarMask />
    <MobileHeader />
    <div class="Main">
      <component :is="MarkdownBody" />
    </div>
  </div>
</template>

<script>
import jump from 'jump.js'
import Sidebar from '../components/Sidebar.vue'
import SidebarMask from '../components/SidebarMask.vue'
import MobileHeader from '../components/MobileHeader.vue'

export default {
  name: 'PageHome',

  components: {
    Sidebar,
    SidebarMask,
    MobileHeader
  },

  created() {
    this.fetchFile()
  },

  beforeRouteUpdate(to, from, next) {
    if (to.path === from.path) {
      return next()
    }
    this.fetchFile(to.path).then(() => {
      next()
    })
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
