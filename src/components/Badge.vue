<template functional>
  <span
    class="badge"
    :class="props.type"
    :style="{backgroundColor: props.color}"
    ><slot></slot>
  </span>
</template>

<script>
export default {
  name: 'Badge',
  props: {
    type: {
      type: String,
      default: 'tip'
    },
    color: {
      type: String
    }
  }
}
</script>
