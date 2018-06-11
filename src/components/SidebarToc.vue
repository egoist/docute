<template>
  <div class="docute-menu">
    <div
      class="docute-menu-item"
      :key="item.id"
      v-for="item in menu">
      <router-link :to="{hash: item.id}">{{ item.value }}</router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: ['menu']
}
</script>

<style scoped>
.docute-menu {
  color: var(--fg-dark);
}

.docute-menu-item {
  padding: 0 var(--padding);
}

.docute-menu-item > a {
  position: relative;
  user-select: none;
  color: var(--fg);
  text-decoration: none;
}

.docute-menu-item > a:hover,
.docute-menu-item.active > a {
  color: var(--fg-dark);
}
</style>
