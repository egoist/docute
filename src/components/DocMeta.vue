<template>
  <div class="doc-meta" :class="{'has-padding': padding}">
    <h1 class="doc-title" v-if="meta.title">{{ meta.title }}</h1>
    <div class="doc-subtitle" v-if="meta.subtitle">
      {{ meta.subtitle }}
    </div>
  </div>
</template>

<script>
export default {
  props: ['meta', 'padding']
}
</script>

<style scoped>
@import "vars.css";

.doc-meta {
  padding-bottom: 30px;
  &.has-padding {
    padding: 30px var(--content-lr-padding) 30px var(--content-lr-padding);
  }
}

.doc-title {
  margin: 0;
  font-weight: 500;
  font-size: 4rem;
  line-height: 1;
}

.doc-subtitle {
  margin-top: 10px;
  font-size: 1.7rem;
  font-weight: 300;
  color: #6d6d6d;
}
</style>
