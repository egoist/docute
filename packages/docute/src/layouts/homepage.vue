<template>
  <div>
    <site-header />
    <div class="main">
      <div class="project">
        <div class="container">
          <div class="title">{{ source.title }}</div>
        <div class="subtitle">{{ source.subtitle }}</div>
        <div class="buttons">
          <router-link class="button has-animation" :to="source.getStarted || '/get-started'">Get Started</router-link>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SiteHeader from '@/components/Header'

export default {
  props: {
    source: {
      type: Object,
      required: true
    }
  },

  components: {
    SiteHeader
  }
}
</script>

<style scoped>
@import "vars.css";

.main {
  padding: var(--header-height) 0;
}

.container {
  max-width: 980px;
  margin: 0 auto;
}

.project {
  padding: 30px 0;

  & .title {
    font-size: 3rem;
    color: var(--primary-color);
  }

  & .subtitle {
    font-size: 2rem;
  }

  & .buttons {
    margin-top: 50px;
  }
}
</style>
