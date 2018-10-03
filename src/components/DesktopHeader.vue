<template>
  <header class="DesktopHeader">
    <InjectedComponents position="header:start" />
    <HeaderNav />
    <InjectedComponents position="header:end" />
  </header>
</template>

<script>
import HeaderNav from './HeaderNav.vue'

export default {
  components: {
    HeaderNav
  }
}
</script>


<style scoped>
@import 'vars.css';

.DesktopHeader {
  border-bottom: 1px solid var(--border-color);
  height: var(--header-height);
  position: fixed;
  top: 0;
  left: var(--sidebar-width);
  right: 0;
  background: white;
  z-index: 8;
}
</style>

<style scoped>
@media screen and (max-width: 768px) {
  .DesktopHeader {
    display: none;
  }
}
</style>
