<template>
  <div :class="$style['custom-toc']" v-html="content"></div>
</template>

<script>
  import marked from 'utils/marked'

  export default {
    props: {
      toc: {
        type: String,
        required: true,
      }
    },
    data() {
      return {
        content: marked(this.toc, {
          context: {
            path: this.$route.path,
            routerMode: this.$router.mode
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
