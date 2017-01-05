<template>
  <router-link
    class="router-link"
    :class="{'router-link-active': item.path === $route.path}"
    :to="item.path"
    v-if="!isExternal(item.path)"
    exact>
    {{ item.title }}
  </router-link>
  <a
    v-else
    :href="item.path"
    target="_blank"
    class="router-link">
    {{ item.title }}
  </a>
</template>

<script>
  export default {
    props: {
      item: {
        required: true
      }
    },
    methods: {
      isExternal(link) {
        return /^https?:\/\//.test(link)
      }
    }
  }
</script>
