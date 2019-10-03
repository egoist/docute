<template>
  <div class="Sidebar" :class="{isShown: $store.state.showSidebar}">
    <InjectedComponents position="sidebar:start" />
    <InjectedComponents position="mobile-sidebar:start" />

    <HeaderNav
      class="mobile-header-nav"
      v-if="$store.getters.config.nav"
      :nav="$store.getters.config.nav"
    />

    <div class="SidebarItems">
      <sidebar-item
        v-for="(item, index) in $store.getters.sidebar"
        :key="index"
        :item="item"
        :open="closedItems.indexOf(index) === -1"
        @toggle="toggleItem(index)"
      />
    </div>

    <InjectedComponents position="sidebar:end" />
    <InjectedComponents position="sidebar:post-end" />
  </div>
</template>

<script>
import HeaderNav from './HeaderNav.vue'
import SidebarItem from './SidebarItem.vue'

export default {
  components: {
    HeaderNav,
    SidebarItem
  },
  data() {
    return {
      closedItems: []
    }
  },
  watch: {
    '$route.path': {
      handler() {
        const index = this.getCurrentIndex(
          this.$route.path,
          this.$store.getters.sidebar
        )
        this.openItem(index)
      },
      immediate: true
    }
  },
  methods: {
    openItem(index) {
      if (this.closedItems.indexOf(index) > -1) {
        this.closedItems = this.closedItems.filter(v => v !== index)
      }
    },
    toggleItem(index) {
      if (this.closedItems.indexOf(index) === -1) {
        this.closedItems.push(index)
      } else {
        this.closedItems = this.closedItems.filter(v => v !== index)
      }
    },
    getCurrentIndex(currentPath, sidebarItems) {
      for (let idx = 0; idx < sidebarItems.length; idx++) {
        if (
          this.getChildren(sidebarItems[idx]).some(
            child => child.link === currentPath
          )
        ) {
          return idx
        }
      }
      return 0
    },
    getChildren(item) {
      return item.children || item.links || []
    }
  }
}
</script>

<style scoped>
.Sidebar {
  width: var(--sidebar-width);
  background: var(--sidebar-background);
  position: fixed;
  top: var(--header-height);
  bottom: 0;
  z-index: 9;
  overflow-y: auto;
  padding: 40px 0 30px 0;
  word-break: break-word;

  & a {
    text-decoration: none;
    color: var(--text-color);
  }

  @media (max-width: 768px) {
    left: 0;
    transform: translateX(-100%);
    width: 80%;
    transition: transform 0.5s cubic-bezier(0.5, 0.32, 0.01, 1);
    padding: 30px 0;
    border-right: 1px solid var(--border-color);

    &.isShown {
      transform: translateX(0);
    }
  }

  @media print {
    display: none;
  }
}
</style>
