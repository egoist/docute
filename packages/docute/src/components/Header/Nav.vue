<template>
  <div class="site-nav">
    <router-link
      :to="item.path"
      class="nav-item"
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

.nav-item:not(:first-child) {
  margin-left: 20px
}

.nav-item {
  display: flex;
  height: 50%;
  align-items: center;
  justify-content: center;
  color: #333;
  text-decoration: none;

  &.router-link-exact-active {
    box-shadow: inset 0 -2px 0 0 #653399;
  }
}
</style>
