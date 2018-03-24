<template>
  <div class="doc-meta">
    <h1 class="doc-title" v-if="meta.title">{{ meta.title }}</h1>
    <div class="doc-subtitle" v-if="meta.subtitle">
      {{ meta.subtitle }}
    </div>
  </div>
</template>

<script>
export default {
  props: ['meta']
}
</script>

<style scoped>
@import "vars.css";

.doc-meta {
  padding: 30px var(--content-lr-padding) 30px var(--content-lr-padding);
}

.doc-title {
  margin: 0;
  font-weight: 500;
  font-size: 2rem;
}

.doc-subtitle {
  margin-top: 10px;
  font-size: 1.3rem;
  font-size: 300;
}
</style>
