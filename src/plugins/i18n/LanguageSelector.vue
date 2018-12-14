<template>
  <div class="LanguageSelector">
    <DocuteSelect @change="handleChange">
      <option disabled>Choose Language</option>
      <option
        v-for="language in languages"
        :value="language.path"
        :selected="isCurrentLocale(language.path)"
        :key="language.path"
      >
        {{ language.language }}
      </option>
    </DocuteSelect>
  </div>
</template>

<script>
export default {
  computed: {
    languages() {
      const {languageOverrides} = this.$store.getters
      return Object.keys(languageOverrides).map(path => ({
        path,
        language: languageOverrides[path].language
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
