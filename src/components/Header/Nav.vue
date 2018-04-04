<template>
  <div class="site-nav">
    <router-link
      :to="item.path"
      class="nav-item"
      :class="{active: item.path === $route.path}"
      v-for="item in nav"
      :key="item.title">
      {{ item.title }}
    </router-link>
  </div>
</template>

<script>
export default {
  props: ['nav']
}
</script>

<style scoped>
@import "vars.css";

.site-nav {
  margin-left: 40px;
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
}

.nav-item {
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  color: var(--header-color);
  text-decoration: none;
  padding: 0 20px;

  &.active {
    box-shadow: inset 0 -2px 0 0 var(--nav-border-color);
  }

  &:focus {
    background-color: rgba(55, 57, 64, 0.29);
  }
}
</style>
