<template>
  <header class="Header">
    <div class="Wrap">
      <div class="header-inner">
        <div class="header-left">
          <h1 class="site-title">
            <SidebarToggle />
            <router-link to="/">{{ $store.getters.config.title }}</router-link>
          </h1>
          <HeaderNav v-if="leftNav" :nav="leftNav" />
        </div>
        <div class="header-right">
          <InjectedComponents position="header-right:start" />
          <HeaderNav v-if="rightNav" :nav="rightNav" />
          <InjectedComponents position="header-right:end" />
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import HeaderNav from './HeaderNav.vue'
import SidebarToggle from './SidebarToggle.vue'

export default {
  components: {
    HeaderNav,
    SidebarToggle
  },

  computed: {
    leftNav() {
      const {nav} = this.$store.getters.config
      return (
        nav &&
        nav.filter(item => {
          return item.position === 'left'
        })
      )
    },

    rightNav() {
      const {nav} = this.$store.getters.config
      return (
        nav &&
        nav.filter(item => {
          return item.position === 'right' || !item.position
        })
      )
    }
  }
}
</script>

<style scoped>
.Header {
  height: var(--header-height);
  line-height: var(--header-height);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 33;
  border-bottom: 1px solid var(--border-color);
  background: var(--header-background);
}

.site-title {
  font-weight: normal;
  margin: 0 25px 0 0;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  white-space: nowrap;

  & a {
    color: var(--text-color);
    text-decoration: none;
  }
}

.header-inner {
  padding: 0 20px;
  position: relative;
  overflow: hidden;
}

.header-left {
  display: flex;
}

.header-right {
  display: flex;
  position: absolute;
  right: 0;
  top: 0;
  height: calc(var(--header-height) - 1px);
  background: var(--header-background);
  padding: 0 20px;

  @media (max-width: 768px) {
    display: none;
  }
}
</style>
