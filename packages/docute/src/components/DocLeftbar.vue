<template>
  <div class="leftbar pretty-scrollbar">
    <DocsToc v-if="showToc === 'left'" :toc="toc" />
    <DocsMenu v-if="showDocs" :docs="docs" />
  </div>
</template>

<script>
import CustomComponent from '@/components/CustomComponents'
import DocsMenu from '@/components/DocsMenu'
import DocsToc from '@/components/DocsToc'

export default {
  components: {
    CustomComponent,
    DocsMenu,
    DocsToc
  },

  props: ['docs', 'showDocs', 'showToc', 'toc']
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
  padding: 30px 0;
  background-color: var(--leftbar-bg);
  overflow: auto;
  z-index: 10;

  & >>> .toc-item {
    padding: 3px 20px;
    border-left: 3px solid transparent;
    padding-left: 17px;

    &[data-depth="3"] {
      padding-left: 37px;
    }

    &.router-link-exact-active {
      border-left-color: var(--primary-color);
    }
  }
}
</style>
