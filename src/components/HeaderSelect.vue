<template>
  <div class="HeaderSelect">
    <div class="SelectedOption" v-if="selected">
      {{ selected.text }}
    </div>
    <div class="Options">
      <div
        class="Option"
        :class="{'is-selected': option.selected}"
        v-for="option in options"
        :key="option.value">
        {{ option.text }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeaderSelect',

  props: {
    options: Array
  },

  computed: {
    selected() {
      const res = this.options.filter(o => o.selected)
      return res.length > 0 ? res[0] : this.options[0]
    }
  }
}
</script>

<style scoped>
@import 'vars.css';

.HeaderSelect {
  position: relative;
  height: var(--header-height);
  line-height: var(--header-height);

  &:hover {
    & .Options {
      display: block;
    }
  }
}

.SelectedOption {
  height: 100%;
  padding: 0 20px;
}

.Options {
  position: absolute;
  top: 100%;
  left: 0;
  display: none;
}

.Option {
  padding: 0 20px;
  border-bottom: 1px solid var(--border-color);

  &.is-selected {
    display: none;
  }
}
</style>
