<template>
  <div class="LanguageSelector">
    <div class="docute-select">
      <select @change="handleChange">
        <option disabled>Choose Language</option>
        <option
          v-for="language in languages"
          :value="language.path"
          :selected="isCurrentLocale(language.path)"
          :key="language.path">
          {{ language.language }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    languages() {
      const { locales } = this.$store.state.originalConfig
      return Object.keys(locales).map(path => ({
        path,
        language: locales[path].language
      }))
    }
  },

  methods: {
    isCurrentLocale(path) {
      return this.$store.getters.currentLocalePath === path
    },

    handleChange(e) {
      const localePath = e.target.value
      const exactPath = this.$route.path.replace(
        new RegExp(`^${this.$store.getters.currentLocalePath}`),
        localePath
      )
      this.$router.push(exactPath)
    }
  }
}
</script>

<style scoped>
.LanguageSelector {
  padding: 0 20px;
  margin-top: 10px;
}
</style>


