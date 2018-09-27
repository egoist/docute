<template>
  <div class="prev-next-links">
    <div class="prev-link" v-if="prevLinkItem">
      ← <router-link
          :to="prevLinkItem.link">
        {{ prevLinkItem.title }}
      </router-link>
    </div>

    <div class="next-link" v-if="nextLinkItem">
      <router-link
        :to="nextLinkItem.link">
        {{ nextLinkItem.title }}
      </router-link> →
    </div>
  </div>
</template>

<script>
import { isExternalLink } from '../utils'

export default {
  computed: {
    navLinks() {
      const nav = this.$store.getters.config.nav || []
      return nav.reduce((res, next) => {
        return [
          ...res,
          ...next.links
        ]
      }, []).filter(item => {
        return !isExternalLink(item.link)
      })
    },

    currentLink() {
      return this.$route.path
    },

    currentLinkIndex() {
      // Related:
      // - https://github.com/vuejs/vue/issues/8728
      // - https://github.com/leptosia/docute/pull/171
      const navLinks = this.navLinks
      for (let i = 0; i < navLinks.length; i++) {
        const item = navLinks[i]
        if (item.link === this.currentLink) {
          return i
        }
      }
      return false
    },

    prevLinkItem() {
      return this.navLinks[this.currentLinkIndex - 1]
    },

    nextLinkItem() {
      return this.navLinks[this.currentLinkIndex + 1]
    }
  }
}
</script>

<style scoped>
@import "vars.css";

.prev-next-links {
  overflow: auto;
  margin-top: 40px;
  padding-top: 30px;
  border-top: 1px solid var(--border-color);
  color: var(--accent-color);

  & a {
    color: var(--accent-color);
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}

.prev-link {
  float: left;
}

.next-link {
  float: right;
}
</style>
