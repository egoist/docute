<template>
  <component
    v-if="pageSource && rendered"
    :source="pageSource"
    :is="layout" />
</template>


<script>
import Vue from 'vue'
import loadMarkdownParser from '@/utils/loadMarkdownParser'
import frontMatter from '@/utils/frontMatter'
import layouts from '@/layouts'
import createStoreMixin from '@/utils/createStoreMixin'

const storeMixin = createStoreMixin({
  state: {
    defaultFileName: state => state.config.defaultFileName
  }
})

const renderAsComponent = content => ({
  name: 'page-content-component',
  ...Vue.compile(`<div class="markdown-body">${content}</div>`)
})

export default {
  name: 'page',

  mixins: [storeMixin],

  props: {
    source: {
      type: Object
    }
  },

  data() {
    return {
      pageSource: null,
      rendered: false
    }
  },

  created() {
    this.tryRender()
    this.$watch('$route.path', this.tryRender)
  },

  methods: {
    async tryRender() {
      if (this.source) {
        this.pageSource = await this.render()
      } else {
        this.pageSource = await this.fetchAndRender()
      }
      this.rendered = true
    },

    async fetchAndRender() {
      const endsWithSlash = this.$route.path.slice(-1) === '/'
      const file = endsWithSlash ? `${this.$route.path}${this.defaultFileName}.md` : `${this.$route.path}.md`
      const [text, md] = await Promise.all([
        fetch(file).then(res => res.text()),
        loadMarkdownParser()
      ])
      const { attributes, body } = frontMatter(text)
      const html = md.render(body)
      return {
        ...attributes,
        content: renderAsComponent(html)
      }
    },

    async render() {
      const md = await loadMarkdownParser()
      const html = md.render(this.source.content)
      return {
        ...this.source,
        content: renderAsComponent(html)
      }
    }
  },

  computed: {
    layout() {
      return this.pageSource && layouts[this.pageSource.layout || 'docs']
    }
  }
}
</script>
