<template>
  <div class="mobile-header-nav">
    <div class="header-nav-item" v-for="(item, index) in nav" :key="index">
      <a v-if="isExternalLink(item.link)" :href="item.link" target="_blank">
        {{ item.title }}
        <external-link-icon />
      </a>
      <router-link
        v-else
        :to="item.link"
        :class="{active: $route.path === item.link}"
      >
        {{ item.title }}
      </router-link>
    </div>
  </div>
</template>

<script>
import {isExternalLink} from '../utils'

export default {
  props: {
    nav: {
      type: Array,
      requried: true
    }
  },

  methods: {
    isExternalLink
  }
}
</script>

<style scoped>
.mobile-header-nav {
  padding: 0 20px;
  margin-bottom: 30px;
  padding-bottom: 30px;
  font-size: 1.1rem;
  border-bottom: 1px solid var(--border-color);

  & a {
    color: var(--link-color);
    text-decoration: none;
    &.active {
      font-weight: bold;
    }
  }

  @media (min-width: 768px) {
    display: none;
  }
}
</style>
