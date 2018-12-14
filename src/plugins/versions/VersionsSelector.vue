<template>
  <div class="VersionsSelector">
    <DocuteSelect @change="handleChange">
      <option disabled>Choose Version</option>
      <option
        v-for="(value, key) in $store.getters.config.versions"
        :key="key"
        :value="value.link"
        :selected="currentVersionLink === value.link"
      >
        {{ key }}
      </option>
    </DocuteSelect>
  </div>
</template>

<script>
import {isExternalLink} from '../../utils'

export default {
  methods: {
    handleChange(e) {
      const link = e.target.value
      if (isExternalLink(link)) {
        location.href = link
      } else {
        this.$router.push(link)
      }
    }
  },

  computed: {
    currentVersionLink() {
      const {versions} = this.$store.getters.config
      for (const version of Object.keys(versions)) {
        const {link} = versions[version]
        if (link !== '/' && this.$route.path.startsWith(link)) {
          return link
        }
      }
      return '/'
    }
  }
}
</script>

<style scoped>
.VersionsSelector {
  padding: 0 20px;
  margin-top: 10px;
}
</style>
