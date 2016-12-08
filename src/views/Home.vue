<template>
  <div id="app">
    <figure class="sidebar">
      <ul class="sidebar-headings">
        <li
          class="sidebar-heading"
          v-for="heading in headings"
          :data-level="heading.level">
          <router-link
            exact
            class="sidebar-heading-anchor"
            :to="{query: {id: heading.slug}}">
            {{ heading.text }}
          </router-link>
        </li>
      </ul>
    </figure>
    <section class="main">
      <home-header></home-header>
      <div class="markdown-body content" v-html="html"></div>
    </section>
  </div>
</template>

<script>
  import marked from 'marked'
  import axios from 'axios'
  import uid from 'uid'
  import jump from 'jump.js'
  import HomeHeader from 'components/HomeHeader.vue'
  import highlight from 'utils/highlight'
  import frontMatter from 'utils/front-matter'
  import {mapState} from 'vuex'

  marked.setOptions({
    highlight(code) {
      return highlight.highlightAuto(code).value
    }
  })

  export default {
    name: 'home',
    data() {
      return {
        html: null,
        attributes: null,
        headings: []
      }
    },
    created() {
      this.fetchReadme()
      this.$watch('id', val => {
        this.jumpTo(val)
      })
    },
    computed: {
      ...mapState({
        id: state => state.route.query.id
      })
    },
    methods: {
      async fetchReadme() {
        const renderer = new marked.Renderer()

        let defaultTitle
        renderer.heading = (text, level) => {
          const hash = uid()
          const slug = text.toLowerCase().replace(/\s/g, '')
          if (level === 1) {
            defaultTitle = text
          } else {
            this.headings.push({level, text, slug, hash})
          }
          return `<h${level} id="${slug}" class="markdown-heading" data-hash="${hash}">${text}</h${level}>`
        }
        renderer.link = (href, title, text) => {
          return `<a target="_blank" href="${href}" title="${title}">${text}</a>`
        }

        let file = '/README.md'
        if (this.$route.meta && this.$route.meta.name === 'page') {
          file = `/${this.$route.params.page}.md`
        }

        const text = await axios.get(file)
          .then(res => res.data)
        const parsed = frontMatter(text)
        this.attributes = parsed.attributes
        this.html = marked(parsed.body, {renderer})

        if (this.attributes.title) {
          document.title = this.attributes.title
        } else if (defaultTitle) {
          document.title = defaultTitle
        }
      },
      jumpTo(slug) {
        jump(`#${slug}`)
      }
    },
    components: {
      HomeHeader
    }
  }

</script>

<style src="highlight.js/styles/github.css"></style>
<style src="github-markdown-css/github-markdown.css"></style>
<style>
  * {
    box-sizing: border-box;
  }
  html, body, #app {
    height: 100%;
  }
  body {
    margin: 0;
    font: 14px/1.4 -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;
  }
  a {
    color: #34495e;
    text-decoration: none;
  }
  .sidebar {
    margin: 0;
    width: 280px;
    border-right: 1px solid #e2e2e2;
    overflow: auto;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    padding: 20px;
    .sidebar-headings {
      list-style: none;
      padding-left: 0;
      margin: 0;
      line-height: 1.7;
      .sidebar-heading {
        &[data-level="3"] {
          padding-left: 20px;
        }
        &[data-level="4"] {
          padding-left: 40px;
        }
        &[data-level="5"] {
          padding-left: 60px;
        }

        .sidebar-heading-anchor {
          &.router-link-active {
            color: #42b983;
          }
        }
      }
    }
  }
  .main {
    padding: 20px;
    padding-left: 300px;
  }
</style>
