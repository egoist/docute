<template>
  <div class="prev-next-links">
    <router-link
      class="prev-link"
      v-if="prevLinkItem"
      :to="prevLinkItem.link">
      ← {{ prevLinkItem.title }}
    </router-link>
    <router-link
      class="next-link"
      v-if="nextLinkItem"
      :to="nextLinkItem.link">
      {{ nextLinkItem.title }} →
    </router-link>
  </div>
</template>

<script>
import { isExternalLink } from '../utils'

export default {
  computed: {
    navLinks() {
      const nav = this.$store.state.config.nav || []
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
