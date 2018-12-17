<template functional>
  <span
    :class="['badge', `is-${props.type}`]"
    :style="{backgroundColor: props.color}"
  >
    <slot></slot>
  </span>
</template>

<script>
export default {
  name: 'Badge',
  props: {
    type: {
      type: String
    },
    color: {
      type: String
    }
  }
}
</script>

<style>
.badge {
  display: inline-block;
  vertical-align: top;
  font-size: 12px;
  height: 18px;
  line-height: 18px;
  border-radius: 9px;
  padding: 0 6px;
  color: #fff;
  margin-right: 5px;
  background: #666;

  &.is-tip {
    background: var(--tip-color);
  }

  &.is-warning {
    background: var(--warning-color);
  }

  &.is-danger {
    background: var(--danger-color);
  }

  &.is-success {
    background: var(--success-color);
  }
}
</style>
