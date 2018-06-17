<template>
  <div class="sidebar-item-headers" v-if="headers.length > 0">
    <div
      class="sidebar-item-header"
      v-for="(header, index) in headers"
      :key="index">
      <router-link
        class="item-header-link"
        :data-depth="header.depth"
        :to="{hash: header.id}">
        {{ header.text }}
      </router-link>
      <SidebarItemHeaders v-if="header.children" :headers="header.children" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'SidebarItemHeaders',
  props: ['headers']
}
</script>

<style scoped>
.sidebar-item-headers {
  margin: 3px 0 5px 0;

  .sidebar-item-headers {
    margin: 3px 0;
  }
}

.item-header-link {
  color: var(--text-color);
  text-decoration: none;
  font-size: 14px;
  display: flex;
  padding: 3px var(--padding);

  &:hover,
  &.router-link-exact-active {
    color: var(--accent-color);
  }

  &[data-depth='2'] {
    padding-left: calc(var(--padding) + 16px);
  }

  &[data-depth='3'] {
    padding-left: calc(var(--padding) + 30px);
  }
}
</style>
