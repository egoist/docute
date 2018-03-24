<template>
  <div class="docs">
    <site-header />
    <doc-leftbar :summary="summary" v-if="summary" />
    <div class="main">
      <doc-meta :meta="meta" v-if="hasMeta" />
      <div class="markdown-body" v-html="html"></div>
    </div>
    <div class="doc-right"></div>
  </div>
</template>

<script>
import createStoreMixin from '@/utils/createStoreMixin'
import loadMarkdownParser from '@/utils/loadMarkdownParser'
import frontMatter from '@/utils/frontMatter'
import SiteHeader from '@/components/Header'
import DocMeta from '@/components/DocMeta'
import DocLeftbar from '@/components/DocLeftbar'

const storeMixin = createStoreMixin({
  state: {
    defaultFileName: state => state.config.defaultFileName,
    summary: state => state.config.summary
  }
})

export default {
  mixins: [storeMixin],

  components: {
    SiteHeader,
    DocMeta,
    DocLeftbar
  },

  data() {
    return {
      html: null,
      meta: null
    }
  },

  created() {
    this.fetchFile()
  },


  mounted() {
    this.$watch('$route.path', this.fetchFile)
  },

  computed: {
    hasMeta() {
      return this.meta && this.meta.title
    }
  },

  methods: {
    async fetchFile() {
      const endsWithSlash = this.$route.path.slice(-1) === '/'
      const file = endsWithSlash ? `${this.$route.path}${this.defaultFileName}.md` : `${this.$route.path}.md`
      const [text, md] = await Promise.all([
        fetch(file).then(res => res.text()),
        loadMarkdownParser()
      ])
      const { attributes, body } = frontMatter(text)
      this.meta = attributes
      this.html = md.render(body)
    }
  }
}
</script>

<style scoped>
@import "vars.css";

.docs {
  display: flex;
}

.main {
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
