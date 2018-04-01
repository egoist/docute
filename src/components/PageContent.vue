<template>
  <div
    class="markdown-body"
    v-if="typeof content === 'string'"
    v-html="content">
  </div>
  <component
    class="markdown-body"
    v-else
    :is="content"
  />
</template>

<script>
export default {
  props: {
    content: {
      type: [String, Object],
      required: true
    }
  }
}
</script>
