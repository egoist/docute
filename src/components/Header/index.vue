<template>
  <header class="header">
    <h1 class="site-title">
      <router-link to="/">{{ title }}</router-link>
    </h1>
    <site-nav v-if="nav" :nav="nav" />
  </header>
</template>

<script>
import SiteNav from './Nav.vue'
import createStoreMixin from '@/utils/createStoreMixin'

const storeMixin = createStoreMixin({
  state: {
    title: state => state.config.site.title,
    nav: state => state.config.nav
  }
})

export default {
  components: {
    SiteNav
  },

  mixins: [storeMixin]
}
</script>

<style scoped>
@import "vars.css";

.header {
  height: var(--header-height);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  padding: 0 20px;
  align-items: center;
  background-color: var(--header-bg);
  z-index: 9000;
  box-shadow: inset 0 -1px 0 0 var(--header-border-color);
}

.site-title {
  margin: 0;
  font-weight: 300;
  font-size: 1.6rem;

  & a {
    text-decoration: none;
    color: var(--header-color);
  }
}
</style>
