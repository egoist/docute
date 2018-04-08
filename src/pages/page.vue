<template>
  <component
    v-if="pageSource && rendered"
    :source="pageSource"
    :toc="toc"
    :is="layout" />
</template>

<script>
import loadMarkdownParser from '@/utils/markdown-it/markdown-it'
import frontMatter from '@/utils/frontMatter'
import createStoreMixin from '@/utils/createStoreMixin'
import jump from 'jump.js'
import Prism from 'prismjs'
import highlightLinesPlugin from '@/utils/markdown-it/highlightLines'
import alertsPlugin from '@/utils/markdown-it/alerts'
import headingsPlugin from '@/utils/markdown-it/headings'
import 'prismjs/components/prism-markdown'
import 'prismjs/components/prism-yaml'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-typescript'
import event from '@/utils/event'
import progress from 'nprogress'
import resolvePath from '@/utils/resolvePath'

progress.configure({ showSpinner: false })

const storeMixin = createStoreMixin({
  state: {
    defaultFileName: state => state.config.defaultFileName,
    site: state => state.config.site,
    base: state => state.config.base
  }
})

const renderAsComponent = (content, { vue }) => {
  if (vue === false) return content

  return {
    name: 'page-content-component',
    delimiters: ['PLEASE_ALLOW_{{', '}}'],
    template: `<div class="markdown-body">${content}</div>`
  }
}

export default {
  name: 'page',

  mixins: [storeMixin],

  props: {
    layouts: {
      type: Object,
      required: true
    }
  },

  head() {
    let title
    if (this.$route.path === '/' || !this.pageSource || !this.pageSource.title) {
      title = this.site.title
    } else {
      title = `${this.pageSource.title} - ${this.site.title}`
    }
    return {
      title
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
      event.emit('content-updated')
      this.rendered = true
      setTimeout(this.scrollHeadingIntoView, 300)
    },

    async fetchAndRender() {
      progress.start()
      const file = this.$route.path === '/' // Homepage
        ? `${resolvePath(this.base, '/')}${this.defaultFileName}.md`
        // Fetches `/foo.md` for both `/foo` and `/foo/`
        : `${resolvePath(this.base, this.$route.path)}.md`
      const [text, MarkdownIt] = await Promise.all([
        fetch(file).then(res => res.text()),
        loadMarkdownParser()
      ])
      progress.done()
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
        html: true,
        highlight(code, lang) {
          return Prism.highlight(code, Prism.languages[lang] || Prism.languages.markup, lang)
        }
      })
      const state = {
        headings: []
      }
      md.use(headingsPlugin(state))
      md.use(highlightLinesPlugin())
      md.use(alertsPlugin())
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
      return this.pageSource && this.layouts[this.pageSource.layout || 'docs']
    },

    source() {
      const source = this.$store.state.config.source || {}
      const path = Object.keys(source).filter(path => {
        return path === this.$route.path
      })[0]
      return path && source[path]
    }
  }
}
</script>
