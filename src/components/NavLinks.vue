<template>
  <nav class="nav-links">
    <div
      class="nav-item"
      v-for="(item, index) in navLinks"
      :key="index">
      <span class="nav-link dropdown" v-if="!item.link">
        <span class="nav-link-text">{{ item.text }}</span>
        <span class="arrow" v-if="item.children"></span>
      </span>
      <a
        class="nav-link is-external"
        :href="item.link"
        target="_blank"
        v-else-if="isExternalLink(item.link)">
        {{ item.text }}
        <ExternalLinkIcon />
      </a>
      <router-link
        class="nav-link"
        :class="{active: $route.path === item.link}"
        :to="item.link"
        v-else>
        {{ item.text }}
      </router-link>
      <div class="nav-item-children-wrapper" v-if="item.children">
        <div class="nav-item-children">
          <div
            class="nav-item-child"
            v-for="(child, index) of item.children"
            :key="index">
            <a
              :href="child.link"
              target="_blank"
              class="nav-item-child-link is-external"
              v-if="isExternalLink(child.link)">
              {{ child.text }}
              <ExternalLinkIcon />
            </a>
            <router-link
              v-else
              :to="child.link"
              class="nav-item-child-link"
              :class="{active: child.active}">
              {{ child.text }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { isExternalLink } from '../utils/link'

export default {
  props: ['nav'],

  methods: {
    isExternalLink
  },

  computed: {
    navLinks() {
      return [...this.nav, this.$store.getters.languageDropdown].filter(Boolean)
    }
  }
}
</script>

<style scoped>
.nav-links {
  display: flex;
  font-size: 15px;
}

.nav-item {
  margin-left: 20px;
  position: relative;

  &:hover {
    .nav-item-children-wrapper {
      display: flex;
    }
  }
}

.nav-link {
  text-decoration: none;
  color: var(--text-color);
  font-weight: 500;
  border-bottom: 2px solid transparent;
  padding-bottom: 3px;
  cursor: pointer;
  display: flex;
  align-items: center;

  &:not(.is-external):hover,
  &.active {
    border-color: var(--accent-color);
  }

  /deep/ .icon {
    margin-left: 3px;
  }

  &.dropdown:hover {
    border-color: transparent;
  }
}

.nav-item-children-wrapper {
  position: absolute;
  background: var(--bg);
  right: 0;
  white-space: nowrap;
  display: none;
  padding-top: 5px;
}

.nav-item-children {
  border-radius: 4px;
  border: 1px solid var(--border-color);
  padding: 8px 0;
}

.nav-item-child-link {
  display: flex;
  padding: 0 20px;
  line-height: 1.7;
  color: var(--text-color);
  text-decoration: none;
  &.active,
  &:hover {
    color: var(--accent-color);
  }
  &.active:before {
    content: '•';
    position: absolute;
    left: 8px;
  }
}

.arrow {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 6px solid #ccc;
  border-bottom: 0;
  margin-top: 2px;
  margin-left: 5px;
}
</style>
