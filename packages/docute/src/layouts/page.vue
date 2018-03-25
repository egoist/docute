<template>
  <div>
    <site-header />
    <div class="main">
      <doc-meta :meta="source" />
      <page-content :content="source.content" />
    </div>
  </div>
</template>

<script>
import SiteHeader from '@/components/Header'
import DocMeta from '@/components/DocMeta'
import PageContent from '@/components/PageContent'

export default {
  props: {
    source: {
      type: Object,
      required: true
    }
  },

  components: {
    SiteHeader,
    DocMeta,
    PageContent
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
