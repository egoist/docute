<template>
  <span class="sidebar-toggle" @click="toggleSidebar">
    <svg aria-hidden="true" role="img" viewBox="0 0 448 512">
      <path
        fill="currentColor"
        d="M436 124H12c-6.627 0-12-5.373-12-12V80c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12z"
      ></path>
    </svg>
  </span>
</template>

<script>
export default {
  methods: {
    toggleSidebar() {
      this.$store.commit('TOGGLE_SIDEBAR')
    }
  },

  watch: {
    '$store.state.showSidebar'(show) {
      if (show) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = 'initial'
      }
    }
  }
}
</script>

<style scoped>
.sidebar-toggle {
  display: flex;
  height: 100%;
  align-items: center;

  @media (min-width: 768px) {
    display: none;
  }

  @media print {
    display: none;
  }

  & svg {
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }
}
</style>
