<template>
  <span class="color-box" :style="{background:color}"></span>
</template>

<script>
export default {
  props: ['color']
}
</script>


<style scoped>
.color-box {
  height: 14px;
  width: 14px;
  display: inline-block;
  border: 1px solid #eee;
}
</style>
