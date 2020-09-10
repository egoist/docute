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
  /* border: 1px solid var(--border-color); */
  margin: 20px 0;
  background-color: var(--note-background);

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
    border-color: var(--note-tip-background);
    background-color: var(--note-tip-background);
    & .note-label {
      color: var(--note-tip-dark);
    }
  }

  &.is-danger {
    border-color: var(--note-danger-background);
    background-color: var(--note-danger-background);
    & .note-label {
      color: var(--note-danger-dark);
    }
  }

  &.is-warning {
    border-color: var(--note-warning-background);
    background-color: var(--note-warning-background);
    & .note-label {
      color: var(--note-warning-dark);
    }
  }

  &.is-success {
    border-color: var(--note-success-background);
    background-color: var(--note-success-background);
    & .note-label {
      color: var(--note-success-dark);
    }
  }
}

.note-label {
  text-transform: uppercase;
  font-weight: 500;
  display: inline-block;
}
</style>
