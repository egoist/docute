<template>
  <div class="dosearch-logo inner-x" v-if="showLogo">
    <a href="https://www.algolia.com/docsearch" target="_blank">
      <img src="https://www.algolia.com/static_assets/images/press/downloads/powered-by-algolia.png" alt="algolia" width="100">
    </a>
  </div>
</template>

<script>
  export default {
    computed: {
      showLogo() {
        return Boolean(this.$store.state.searchResult)
      }
    }
  }
</script>
