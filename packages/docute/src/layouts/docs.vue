<template>
  <div class="docs">
    <site-header />
    <doc-leftbar :docs="docs" v-if="docs" />
    <div class="content">
      <doc-meta :padding="true" :meta="source" v-if="source.title" />
      <page-content :content="source.content" />
    </div>
    <div class="doc-right"></div>
  </div>
</template>

<script>
import createStoreMixin from '@/utils/createStoreMixin'
import SiteHeader from '@/components/Header'
import DocMeta from '@/components/DocMeta'
import DocLeftbar from '@/components/DocLeftbar'
import PageContent from '@/components/PageContent'

const storeMixin = createStoreMixin({
  state: {
    docs: state => state.config.docs
  }
})

export default {
  name: 'docs',

  mixins: [storeMixin],

  components: {
    SiteHeader,
    DocMeta,
    DocLeftbar,
    PageContent
  },

  props: {
    source: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
@import "vars.css";

.docs {
  display: flex;
}

.content {
  margin-left: var(--leftbar-width);
  padding-top: var(--header-height);
  width: calc(100% - var(--leftbar-width) - var(--rightbar-width));
}

.markdown-body {
  padding: 20px var(--content-lr-padding);
}

.doc-right {
  width: var(--rightbar-width);
}
</style>
