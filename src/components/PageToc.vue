<template>
  <div
    class="PageToc"
    v-if="
      !$store.state.fetchingFile &&
        link.toc !== false &&
        link.link === $route.path &&
        $store.state.page.headings &&
        $store.state.page.headings.length > 0
    "
  >
    <router-link
      class="PageTocHeading"
      :to="{hash: heading.slug}"
      :data-level="heading.level"
      v-for="heading in $store.state.page.headings"
      :key="heading.slug"
      v-html="heading.text"
    ></router-link>
  </div>
</template>

<script>
export default {
  props: {
    link: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.PageToc {
  border-left: 1px solid var(--border-color);
  margin-left: 16px;
  margin-top: 10px;
}

.PageTocHeading {
  display: flex;
  line-height: 1;
  position: relative;

  &:not(:last-child) {
    margin-bottom: 8px;
  }

  &[data-level='2'] {
    margin-left: 16px;
  }

  &.router-link-exact-active {
    font-weight: bold;
    color: var(--sidebar-link-active-color);
  }
}
</style>
