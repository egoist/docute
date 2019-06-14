<template>
  <div class="search" :class="{'is-focused': focused}" v-if="enabled">
    <div class="search-input-wrapper">
      <span class="search-icon">
        <svg
          width="13"
          height="13"
          viewBox="0 0 13 13"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
        >
          <path
            d="M8.87 8.16l3.25 3.25-.7.71-3.26-3.25a5 5 0 1 1 .7-.7zM5 9a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"
          ></path>
        </svg>
      </span>
      <input
        class="search-input"
        type="text"
        @input="handleSearch"
        @focus="toggleFocus(true)"
      />
      <div class="search-result" ref="result" v-show="result.length > 0">
        <router-link
          :to="item.link"
          class="search-result-item"
          v-for="(item, i) in result"
          :key="i"
        >
          <div class="item-header">
            <div class="item-title" v-html="item.title"></div>
            <span class="item-label" v-if="item.label">{{ item.label }}</span>
          </div>
          <div class="item-desc" v-html="item.description"></div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import {debounce} from 'throttle-debounce'

export default {
  data() {
    return {
      result: [],
      focused: false
    }
  },

  watch: {
    '$route.fullPath'() {
      this.focused = false
    }
  },

  mounted() {
    document.addEventListener('click', this.handleClick)
  },

  beforeDestroy() {
    document.removeEventListener('click', this.handleClick)
  },

  computed: {
    enabled() {
      return this.$pluginApi.search.enabled
    }
  },

  methods: {
    handleClick(e) {
      if (
        !this.$el.contains(e.target) ||
        this.$refs.result.contains(e.target)
      ) {
        this.focused = false
      }
    },

    handleSearch: debounce(300, async function(e) {
      const {handler} = this.$pluginApi.search
      this.result = await handler(e.target.value)
    }),

    toggleFocus(focused) {
      this.focused = focused
    }
  }
}
</script>

<style scoped>
.search {
  display: flex;
  height: 100%;
  align-items: center;
  position: relative;

  &.is-focused {
    & .search-icon {
      color: var(--search-focus-icon-color);
    }

    & .search-input-wrapper {
      border-color: var(--search-focus-border-color);
    }

    & .search-result {
      display: block;
    }
  }

  @media print {
    display: none;
  }
}

.search-input-wrapper {
  border: 1px solid var(--border-color);
  border-radius: 4px;
  padding: 0;
  height: 50%;
  position: relative;
  width: 240px;

  @media (max-width: 768px) {
    width: 28px;
    overflow: hidden;

    @nest .is-focused & {
      width: 200px;
      overflow: initial;
    }
  }
}

.search-icon {
  color: var(--search-icon-color);
  position: absolute;
  top: 50%;
  left: 7px;
  transform: translateY(-50%);
  margin-top: 2px;
}

.search-input {
  border: none;
  outline: none;
  background: transparent;
  color: var(--text-color);
  position: absolute;
  padding: 0 8px 0 28px;
  width: 100%;
  height: 100%;
}

.search-result {
  display: none;
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  width: 20rem;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.12);
  z-index: 9999;
  background: var(--header-background);
}

.search-result-item {
  padding: 10px;
  display: block;
  background: var(--search-result-background);

  &:not(:last-child) {
    border-bottom: 1px solid var(--border-color);
  }

  &:hover {
    background: var(--search-result-hover-background);
  }
}

.item-title {
  font-size: 1.1rem;
  font-weight: 500;
  display: inline;
  line-height: 1;
}

.item-desc {
  font-size: 0.875rem;
  margin-top: 10px;
}

.item-label {
  border-radius: 4px;
  padding: 0 5px;
  height: 22px;
  display: inline-block;
  border: 1px solid var(--border-color);
  font-size: 13px;
  margin-left: 10px;
}
</style>
