<template>
  <header class="docute-header">
    <h1 class="docute-title">
      <div class="sidebar-toggle" @click="toggleSidebar">
        <MenuIcon />
      </div>
      <router-link to="/">{{ title }}</router-link>
    </h1>
    <div class="header-right">
      <SearchBox v-if="siteConfig.search && siteConfig.search.type" />
      <NavLinks v-if="siteConfig.nav" :nav="siteConfig.nav" />
    </div>
  </header>
</template>

<script>
import NavLinks from './NavLinks.vue'
import SearchBox from './SearchBox.vue'
import { mapGetters, mapMutations } from 'vuex'

export default {
  props: ['title'],

  computed: {
    ...mapGetters(['siteConfig'])
  },

  methods: {
    ...mapMutations(['toggleSidebar'])
  },

  components: {
    NavLinks,
    SearchBox
  }
}
</script>

<style scoped>
.docute-header {
  height: var(--header-height);
  border-bottom: 1px solid var(--border-color);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 var(--padding);
  background: var(--bg);
  z-index: 1000;
}

.header-right {
  display: flex;
  align-items: center;
}

.docute-title {
  margin: 0;
  font-size: 20px;
  display: flex;
  align-items: center;

  a {
    color: inherit;
    text-decoration: none;
  }
}

.sidebar-toggle {
  display: none;
  margin-right: 10px;

  svg {
    width: 20px;
    height: 20px;
  }
}

@media screen and (max-width: 768px) {
  .docute-header {
    /deep/ .nav-links {
      display: none;
    }
  }

  .sidebar-toggle {
    display: flex;
  }
}
</style>
