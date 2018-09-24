<template>
  <div class="MobileHeader">
    <div class="SiteTitle">
      <svg @click="toggleSidebar" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" viewBox="0 0 448 512" class="icon"><path fill="currentColor" d="M436 124H12c-6.627 0-12-5.373-12-12V80c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12z"></path></svg> <router-link to="/">{{ $store.state.config.title }}</router-link>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    toggleSidebar() {
      this.$store.commit('TOGGLE_SIDEBAR')
    }
  }
}
</script>


<style scoped>
@import "vars.css";

.MobileHeader {
  display: none;
  padding: 0 20px;
  height: var(--mobile-header-height);
  line-height: var(--mobile-header-height);
  background: var(--accent-color);
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}

.SiteTitle {
  font-size: 1.4rem;
  display: flex;
  align-items: center;

  & a {
    color: inherit;
    text-decoration: none;
  }
}

.icon {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}
</style>

<style scoped>
@media screen and (max-width: 768px) {
  .MobileHeader {
    display: flex;
  }
}
</style>

