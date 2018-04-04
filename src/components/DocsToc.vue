<template>
  <div class="toc">
    <router-link
      class="toc-item"
      v-for="(item, index) in toc"
      :key="index"
      v-html="item.text"
      :to="{hash: item.slug}"
      :data-depth="item.depth">
    </router-link>
  </div>
</template>

<script>
export default {
  props: ['toc']
}
</script>

<style scoped>
@import "vars.css";

.toc {
  padding-right: 10px;
}

.toc-item {
  display: flex;
  color: var(--black);
  text-decoration: none;
  padding-bottom: 5px;
  font-size: 13px;

  &:hover {
    color: rgb(109, 109, 109);
  }

  &[data-depth="3"] {
    padding-left: 20px;
  }

  &.router-link-exact-active {
    font-weight: bold;
  }
}
</style>
