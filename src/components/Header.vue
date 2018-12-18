<template>
  <header class="Header">
    <div class="Wrap" :class="{'is-center': $store.getters.centerContent}">
      <div class="header-inner">
        <div class="header-left">
          <h1 class="site-title">
            <SidebarToggle />
            <router-link to="/">{{ $store.getters.config.title }}</router-link>
          </h1>
          <HeaderNav v-if="leftNav" :nav="leftNav" />
        </div>
        <div class="header-right">
          <HeaderNav v-if="rightNav" :nav="rightNav" />
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
@import 'vars.css';

.Header {
  height: var(--header-height);
  line-height: var(--header-height);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 33;
  border-bottom: 1px solid var(--border-color);
  background: var(--sidebar-bg);
}

.site-title {
  width: 100%;
  font-weight: normal;
  margin: 0 25px 0 0;
  font-size: 1.2rem;
  display: flex;
  align-items: center;

  & a {
    color: #000;
    text-decoration: none;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

.header-inner {
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
}

.header-right {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}

.header-left {
  width: 100%;
  display: flex;
}
</style>
