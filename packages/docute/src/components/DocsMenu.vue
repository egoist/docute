<template>
  <div class="docs-menu">
    <div class="docs-menu-item" v-if="docs" v-for="item in docs" :key="item.title">
      <div class="title">{{ item.title }}</div>
      <router-link
        :to="child.path"
        class="item"
        :class="{active: child.path === $route.path}"
        v-for="child in item.children"
        :key="child.title">
        {{ child.title }}
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: ['docs']
}
</script>


<style scoped>
@import "vars.css";

.docs-menu-item {
  margin-bottom: 20px;
}

.title {
  font-size: 1.1rem;
  padding: 0 20px;
  margin: 0 0 10px 0;
}

.item {
  color: rgba(0,0,0,.65);
  text-decoration: none;
  padding: 3px 20px;
  padding-left: 17px;
  display: flex;
  border-left: 3px solid transparent;
  font-size: 1rem;

  &:hover {
    color: var(--black);
    background: #f9f9f9;
    border-left-color: var(--border-color);
  }

  &.active {
    color: var(--black);
    font-weight: 700;
    border-left-color: var(--primary-color);
  }
}
</style>
