<template>
  <div class="error-page">
    <h1 class="error-page-title">{{ title }}</h1>
    <div>{{ message }}</div>
    <div class="go-home">
      <router-link to="/">Return Homepage</router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: ['error'],

  head() {
    return {
      title: `${this.title} - ${this.$store.getters.siteConfig.title}`
    }
  },

  computed: {
    title() {
      return this.error.statusText
    },

    message() {
      if (this.error.status) {
        return this.error.status === 404
          ? `Cannot find ${this.error.url}`
          : this.error.statusText
      }
    }
  }
}
</script>

<style scoped>
.error-page {
  padding: 20px;
  padding-top: calc(var(--header-height) + 20px);
}

.error-page-title {
  margin: 0;
  margin-bottom: 20px;
}

.go-home {
  margin: 20px 0;

  a {
    color: var(--accent-color);
  }
}
</style>
