<template>
  <div
      v-html="content.html"
      v-bind:style="{height: formatHeight()}">
  </div>
</template>

<script>
  import parseResource from 'utils/parse-resource'

  export default {
    props: {
      htmlFile: {
        type: [String, Object],
        required: true
      },
      heightPx: {
        type: Object,
        default: 'auto'
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
        this.content = await parseResource(this.htmlFile, {
          progress: false,
          componentName: 'html-content'
        })
      },
      formatHeight() {
        if (!isNaN(parseFloat(this.heightPx)) && isFinite(this.heightPx)) {
          return this.heightPx + 'px';
        }
        return this.heightPx;
      }
    }
  }
</script>
