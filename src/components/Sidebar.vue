<template>
  <div class="sidebar">
    <SidebarMenu :headings="headings" />
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import SidebarMenu from './SidebarMenu.vue'

export default {
  props: ['headings'],

  methods: {
    ...mapMutations(['toggleSidebar'])
  },

  components: {
    SidebarMenu
  }
}
</script>

<style scoped>
.sidebar {
  position: fixed;
  top: var(--header-height);
  left: 0;
  bottom: 0;
  width: var(--sidebar-width);
  border-right: 1px solid var(--border-color);
  background: var(--bg);
  z-index: 1011;
  overflow: auto;
}

@media screen and (max-width: 768px) {
  .sidebar {
    transform: translateX(calc(var(--sidebar-width) * -1));
    transition: transform 0.3s var(--ease);
  }
}
</style>

<style>
@media screen and (max-width: 768px) {
  .sidebar-open {
    .sidebar {
      transform: translateX(0);
    }
  }
}
</style>
