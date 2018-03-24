<template>
  <div>
    <site-header />
    <div class="main">
      <doc-meta :meta="source" />
      <div class="markdown-body" v-html="source.content"></div>
    </div>
  </div>
</template>

<script>
import SiteHeader from '@/components/Header'
import DocMeta from '@/components/DocMeta'

export default {
  props: {
    source: {
      type: Object,
      required: true
    }
  },

  components: {
    SiteHeader,
    DocMeta
  }
}
</script>

<style scoped>
@import "vars.css";

.main {
  padding-top: var(--header-height);
  max-width: 980px;
  margin: 30px auto;
}
</style>
