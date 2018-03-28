<template>
  <div class="docs" :class="{'has-leftbar': showLeftBar, 'has-rightbar': showRightBar}">
    <site-header />
    <doc-leftbar
      :showToc="showToc"
      :showDocs="showDocs"
      :docs="docs"
      :toc="toc"
      v-if="showLeftBar" />
    <div class="main">
      <div class="content">
        <doc-meta :padding="true" :meta="source" v-if="source.title" />
        <page-content :content="source.content" />
      </div>
      <div class="doc-right" v-if="showRightBar">
        <DocsToc v-if="toc" :toc="toc" />
      </div>
    </div>
  </div>
</template>

<script>
import SiteHeader from '@/components/Header'
import DocMeta from '@/components/DocMeta'
import DocLeftbar from '@/components/DocLeftbar'
import PageContent from '@/components/PageContent'
import componentManager from '@/utils/componentManager'
import DocsMenu from '@/components/DocsMenu'
import DocsToc from '@/components/DocsToc'
import createStoreMixin from '@/utils/createStoreMixin'

const storeMixin = createStoreMixin({
  state: {
    docs: state => state.config.docs
  }
})

export default {
  name: 'docs-layout',

  mixins: [storeMixin],

  components: {
    SiteHeader,
    DocMeta,
    DocLeftbar,
    PageContent,
    DocsToc
  },

  props: {
    source: {
      type: Object,
      required: true
    },
    toc: {
      type: Array
    }
  },

  computed: {
    showToc() {
      if (!this.toc || this.toc.length === 0) return false
      if (typeof this.source.toc !== 'undefined') return this.source.toc
      if (this.source.layout === 'page') return 'left'
      return false
    },
    // Only show docs menu in `docs` layout
    // And you don't show toc on the left bar
    showDocs() {
      return this.source.layout !== 'page' && this.showToc !== 'left'
    },
    showLeftBar() {
      return this.source.leftBar !== false && (this.showToc === 'left' || this.showDocs || componentManager.count('leftBar') > 0)
    },
    showRightBar() {
      return this.source.rightBar !== false && ((this.showToc && this.showToc !== 'left') || componentManager.count('rightBar') > 0)
    }
  }
}
</script>

<style scoped>
@import "vars.css";

.docs {
  display: flex;

  &.has-leftbar {
    & .main {
      max-width: 100%;
      width: 100%;
    }

    & .content {
      margin-left: var(--leftbar-width);
      width: calc(100% - var(--leftbar-width));
    }
  }

  &.has-rightbar {
    & .main {
      max-width: 1260px;
    }

    & .content {
      width: calc(100% - var(--rightbar-width));
    }
  }

  &.has-leftbar.has-rightbar {
    & .main {
      max-width: 100%;
      width: 100%;
    }

    & .content {
      width: calc(100% - var(--leftbar-width) - var(--rightbar-width));
    }
  }
}

.main {
  max-width: 1260px;
  margin: 0 auto;
  display: flex;
}

.content {
  padding-top: var(--header-height);
}

.markdown-body {
  padding: 20px var(--content-lr-padding);
}

.doc-right {
  width: var(--rightbar-width);
  top: var(--header-height);
  padding: 30px 0;
  position: sticky;
  /* hmm */
  height: 100%;
  height: fit-content;
}
</style>
