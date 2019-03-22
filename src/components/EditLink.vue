<template>
  <div v-if="editLink" class="EditLink">
    <a target="_blank" :href="`${editLink}`">
      <svg
        class="icon"
        id="i-compose"
        viewBox="0 0 32 32"
        width="32"
        height="32"
        fill="none"
        stroke="currentcolor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
      >
        <path
          d="M27 15 L27 30 2 30 2 5 17 5 M30 6 L26 2 9 19 7 25 13 23 Z M22 6 L26 10 Z M9 19 L13 23 Z"
        ></path>
      </svg>
      {{ editLinkText }}
    </a>
  </div>
</template>

<script>
export default {
  computed: {
    editLink() {
      return this.$store.state.page.editLink
    },

    editLinkText() {
      return this.$store.getters.config.editLinkText || 'Edit this page'
    }
  }
}
</script>

<style scoped>
.EditLink {
  margin-top: 50px;

  & a {
    display: inline-flex;
    align-items: center;
  }
}

.icon {
  width: 18px;
  height: 18px;
  margin-right: 10px;
}
</style>
