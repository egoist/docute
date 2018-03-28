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
  color: white;
  text-decoration: none;
  padding: 0 20px;

  &.active {
    box-shadow: inset 0 -2px 0 0 var(--primary-color);
  }

  &:focus {
    background-color: rgb(55, 57, 64);
    color: rgb(255, 255, 255);
  }
}
</style>
