<template>
  <nav class="nav-links">
    <div class="nav-item" v-for="(item, index) in nav" :key="index">
      <a
        class="nav-link is-external"
        :href="item.link"
        target="_blank"
        v-if="isExternalLink(item.link)">
        {{ item.title }}
        <ExternalLinkIcon />
      </a>
      <router-link
        class="nav-link"
        :class="{active: $route.path === item.link}"
        :to="item.link"
        v-else>
        {{ item.title }}
      </router-link>
    </div>
  </nav>
</template>

<script>
import { isExternalLink } from '../utils/link'

export default {
  props: ['nav'],

  methods: {
    isExternalLink
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
}

.nav-link {
  text-decoration: none;
  color: var(--text-color);
  font-weight: 500;
  border-bottom: 2px solid transparent;
  padding-bottom: 3px;

  &:not(.is-external):hover,&.active {
    border-color: var(--accent-color);
  }
}
</style>

