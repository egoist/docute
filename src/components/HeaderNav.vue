<template>
  <div class="header-nav">
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
      required: true
    }
  },

  methods: {
    isExternalLink
  }
}
</script>

<style scoped>
.header-nav {
  display: flex;

  & .header-nav-item {
    &:not(:first-child) {
      margin-left: 20px;
    }
  }

  & a {
    color: #999;
    text-decoration: none;

    &:hover,
    &.active {
      color: #000;
    }
  }

  @media (max-width: 768px) {
    display: none;
  }
}
</style>
