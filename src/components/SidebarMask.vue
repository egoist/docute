<template>
  <div
    class="SidebarMask"
    @click="$store.commit('TOGGLE_SIDEBAR', false)"
    v-if="$store.state.showSidebar"
  ></div>
</template>

<style scoped>
.SidebarMask {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 8;
}
</style>
