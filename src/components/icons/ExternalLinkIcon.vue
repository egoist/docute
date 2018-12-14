<template functional>
  <svg
    viewBox="0 0 32 32"
    width="15"
    height="15"
    fill="none"
    stroke="currentcolor"
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke-width="2"
    v-bind="data.attrs"
    v-on="data.on"
    :class="[data.staticClass, data.class]"
  >
    <path d="M14 9 L3 9 3 29 23 29 23 18 M18 4 L28 4 28 14 M28 4 L14 18" />
  </svg>
</template>

<script>
export default {
  name: 'ExternalLinkIcon'
}
</script>
