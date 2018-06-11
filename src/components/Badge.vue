<template functional>
  <span class="badge" :class="props.type">
    <slot></slot>
  </span>
</template>

<script>
export default {
  name: 'Badge',

  props: {
    type: {
      type: String,
      default: 'tip'
    }
  }
}
</script>
