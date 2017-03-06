<template>
  <router-link
    class="router-link"
    :class="{'router-link-active': item.path === $route.path}"
    :to="item.path"
    @click.native="handleClickNavLink(item.path)"
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
  import jump from 'jump.js'

  export default {
    props: {
      item: {
        required: true
      }
    },
    methods: {
      isExternal(link) {
        return /^https?:\/\//.test(link)
      },
      handleClickNavLink(path) {
        if (path === this.$route.path) {
          jump('#app', {
            duration: 300
          })
        }
      }
    }
  }
</script>
