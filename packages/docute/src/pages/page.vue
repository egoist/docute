<template>
  <component
    v-if="pageSource && rendered"
    :source="pageSource"
    :toc="toc"
    :is="layout" />
</template>


<script>
import Vue from 'vue'
import loadMarkdownParser from '@/utils/loadMarkdownParser'
import frontMatter from '@/utils/frontMatter'
import layouts from '@/layouts'
import createStoreMixin from '@/utils/createStoreMixin'
import headingsPlugin from 'markdown-it-headings'
import jump from 'jump.js'

const storeMixin = createStoreMixin({
  state: {
    defaultFileName: state => state.config.defaultFileName
  }
})

const renderAsComponent = (content, { vue }) => {
  if (vue === false) return content

  return {
    name: 'page-content-component',
    ...Vue.compile(`<div class="markdown-body">${content}</div>`)
  }
}

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
      rendered: false,
      toc: null
    }
  },

  mounted() {
    this.tryRender()
    this.$watch('$route.path', this.tryRender)
    this.$watch('$route.hash', this.scrollHeadingIntoView)
  },

  methods: {
    async tryRender() {
      if (this.source) {
        this.pageSource = await this.render()
      } else {
        this.pageSource = await this.fetchAndRender()
      }
      this.rendered = true
      setTimeout(this.scrollHeadingIntoView, 300)
    },

    async fetchAndRender() {
      const endsWithSlash = this.$route.path.slice(-1) === '/'
      const file = endsWithSlash
        ? `${this.$route.path}${this.defaultFileName}.md`
        : `${this.$route.path}.md`
      const [text, MarkdownIt] = await Promise.all([
        fetch(file).then(res => res.text()),
        loadMarkdownParser()
      ])
      const { attributes, body } = frontMatter(text)
      const html = this.renderToHtml(MarkdownIt, body)
      return {
        ...attributes,
        content: renderAsComponent(html, attributes)
      }
    },

    async render() {
      const MarkdownIt = await loadMarkdownParser()
      const html = this.renderToHtml(MarkdownIt, this.source.content)
      return {
        ...this.source,
        content: renderAsComponent(html, this.source)
      }
    },

    renderToHtml(MarkdownIt, text) {
      const md = new MarkdownIt({
        html: true
      })
      const state = {
        headings: []
      }
      md.use(headingsPlugin(state))
      const html = md.render(text)
      this.toc = state.headings
      return html
    },

    scrollHeadingIntoView() {
      const el = this.$route.hash && document.querySelector(this.$route.hash)
      if (el) {
        jump(el, {
          offset: -(document.querySelector('.header').clientHeight + 20),
          duration: 300
        })
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
