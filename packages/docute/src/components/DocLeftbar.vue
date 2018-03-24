<template>
  <div class="leftbar pretty-scrollbar">
    <div class="leftbar-section" v-for="item in summary" :key="item.title">
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
    summary: {
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
  border-right: 1px solid var(--border-color);
  position: fixed;
  top: calc(var(--header-height) + 1px);
  bottom: 0;
  left: 0;
  background-color: #fbfafc;
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
  font-size: .875rem;

  &:hover {
    color: var(--primary-color);
    background: #f9f9f9;
    border-left-color: var(--border-color);
  }

  &.router-link-exact-active {
    color: var(--primary-color);
    font-weight: 700;
    border-left-color: var(--border-color);
  }
}
</style>
