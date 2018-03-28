<template>
  <div class="leftbar pretty-scrollbar">
    <div class="leftbar-section" v-for="item in docs" :key="item.title">
      <div class="section-title">{{ item.title }}</div>
      <router-link
        :to="child.path"
        class="section-item"
        v-for="child in item.children"
        :key="child.title">
        {{ child.title }}
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    docs: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
@import "vars.css";

.leftbar {
  width: var(--leftbar-width);
  border-right: 1px solid rgb(236, 236, 236);
  position: fixed;
  top: var(--header-height);
  bottom: 0;
  left: 0;
  background-color: var(--leftbar-bg);
  overflow: auto;
}

.section-title {
  font-size: 1.1rem;
  padding: 0 20px;
  margin: 20px 0 10px 0;
}

.section-item {
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

  &.router-link-exact-active {
    color: var(--black);
    font-weight: 700;
    border-left-color: var(--primary-color);
  }
}
</style>
