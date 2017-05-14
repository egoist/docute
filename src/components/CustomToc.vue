<template>
  <component
    :class="$style['custom-toc']"
    v-if="content.component"
    :is="content.component" />
  <div
    v-else-if="content.html"
    :class="$style['custom-toc']"
    v-html="content.html"></div>
</template>

<script>
  import parseResource from 'utils/parse-resource'

  export default {
    props: {
      toc: {
        type: [String, Object],
        required: true
      }
    },
    data() {
      return {
        content: {}
      }
    },
    created() {
      this.fetchResource()
    },
    methods: {
      async fetchResource() {
        this.content = await parseResource(this.toc, {
          progress: false,
          componentName: 'custom-toc-content',
          marked: {
            context: {
              path: this.$route.path,
              routerMode: this.$router.mode
            }
          }
        })
      }
    }
  }
</script>

<style module>
  .custom-toc {
    ul {
      list-style: none;
      margin: 0;
      margin-top: 10px;
      padding-left: 0;
      font-weight: 700;
      ul {
        margin-top: 0;
        font-weight: normal;
        a {
          color: #666;
        }
      }
      a {
        padding: 7px 20px;
        display: block;
        color: #333;
        &:hover {
          color: #42B98D;
          text-decoration: none;
        }
      }
    }
  }
</style>
