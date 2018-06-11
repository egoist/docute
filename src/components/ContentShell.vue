<template>
  <ContentLoader
    :height="475"
    :width="400">
    <rect x="0" y="12" rx="3" ry="3" width="125" height="12" />
    <rect x="0" y="30.8" rx="3" ry="3" width="206" height="8" />
    <rect x="0" y="88.8" rx="3" ry="3" width="173" height="10" />
    <rect x="0" y="110.8" rx="3" ry="3" width="260" height="6" />
    <rect x="0" y="120.8" rx="3" ry="3" width="300" height="6" />
    <rect x="0" y="130.8" rx="3" ry="3" width="235" height="6" />
  </ContentLoader>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'

export default {
  components: {
    ContentLoader
  }
}
</script>
