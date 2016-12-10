<template>
  <div class="page">
    <figure class="sidebar" v-if="loaded">
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
      <home-header v-if="loaded"></home-header>
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
  import {mapState, mapGetters, mapActions} from 'vuex'
  import nprogress from 'nprogress'

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
        headings: [],
        loaded: false
      }
    },
    beforeRouteEnter(to, from, next) {
      nprogress.start()
      next()
    },
    created() {
      this.fetchReadme()
      this.$watch('id', val => {
        if (val) this.jumpTo(val)
      })
    },
    computed: {
      ...mapState({
        id: state => state.route.query.id
      }),
      ...mapGetters(['currentTitle'])
    },
    methods: {
      ...mapActions(['updateAttributes']),
      async fetchReadme() {
        const renderer = new marked.Renderer()

        renderer.heading = (text, level) => {
          const hash = uid()
          const slug = text.toLowerCase().replace(/\s/g, '')
          if (level !== 1) {
            this.headings.push({level, text, slug, hash})
          }
          return `<h${level} id="${slug}" class="markdown-heading" data-hash="${hash}">${text}</h${level}>`
        }
        renderer.link = (href, title, text) => {
          return `<a target="_blank" href="${href}" title="${title}">${text}</a>`
        }

        let file = './README.md'
        if (this.$route.meta && this.$route.meta.name === 'page') {
          file = `./${this.$route.params[0]}.md`
        }

        let text
        try {
          text = await axios.get(file).then(res => res.data)
        } catch (err) {
          if (err.response) {
            if (err.response.status === 404) {
              this.$router.go('/404')
            }
          }
          nprogress.done()
          return
        }

        nprogress.set(0.6)

        const parsed = frontMatter(text)
        this.attributes = parsed.attributes
        this.html = marked(parsed.body, {renderer})

        this.updateAttributes(this.attributes)

        if (this.attributes.title) {
          document.title = this.attributes.title
        } else {
          document.title = this.currentTitle
        }

        nprogress.done()
        this.loaded = true

        // scroll to id (the url query `id`)
        this.$nextTick(() => {
          if (this.id) {
            this.jumpTo(this.id)
          }
        })
      },
      jumpTo(slug) {
        jump(`#${slug}`, {
          duration: 300,
          a11y: true,
          offset: -10
        })
      }
    },
    components: {
      HomeHeader
    }
  }

</script>

<style src="css/nprogress.css"></style>
<style src="css/highlight.css"></style>
<style src="github-markdown-css/github-markdown.css"></style>
<style>
  * {
    box-sizing: border-box;
  }
  html, body, #app, .page {
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
    border-right: 1px solid rgba(0,0,0,.07);
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
  .markdown-body {
    .markdown-heading:focus {
      color: #42b983;
      outline: none;
    }
  }
</style>
