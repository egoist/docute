<template functional>
  <div :class="['note', `is-${props.type}`]">
    <span class="note-label" v-if="props.label"
      >{{ props.label === true ? props.type : props.label }}:</span
    >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Note',
  props: {
    type: {
      type: String,
      default: 'note'
    },
    label: {
      type: [String, Boolean],
      default: true
    }
  }
}
</script>

<style>
.note {
  line-height: 1;
  padding: 15px 20px;
  border-radius: 4px;
  border: 1px solid var(--border-color);
  margin: 20px 0;

  & > *:not(.note-label) {
    line-height: 1.7;
  }

  & > *:first-child {
    margin-top: 0;
  }

  & > *:last-child {
    margin-bottom: 0;
  }

  &.is-tip {
    border-color: var(--tip-color);
    & .note-label {
      color: var(--tip-color);
    }
  }

  &.is-danger {
    border-color: var(--danger-color);
    & .note-label {
      color: var(--danger-color);
    }
  }

  &.is-warning {
    border-color: var(--warning-color);
    & .note-label {
      color: var(--warning-color);
    }
  }

  &.is-success {
    border-color: var(--success-color);
    & .note-label {
      color: var(--success-color);
    }
  }
}

.note-label {
  text-transform: uppercase;
  font-weight: 500;
  display: inline-block;
}
</style>
