<template>
  <div class="prev-next-links" v-if="prevLinkItem || nextLinkItem">
    <div class="prev-link" v-if="prevLinkItem">
      <router-link :to="prevLinkItem.link">
        ← {{ prevLinkItem.title }}
      </router-link>
    </div>

    <div class="next-link" v-if="nextLinkItem">
      <router-link :to="nextLinkItem.link">
        {{ nextLinkItem.title }} →
      </router-link>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  computed: {
    ...mapGetters(['sidebarLinks']),

    currentLink() {
      return this.$route.path
    },

    currentLinkIndex() {
      // Related:
      // - https://github.com/vuejs/vue/issues/8728
      // - https://github.com/egoist/docute/pull/171
      const {sidebarLinks} = this
      for (let i = 0; i < sidebarLinks.length; i++) {
        const item = sidebarLinks[i]
        if (item.link === this.currentLink) {
          return i
        }
      }
      return false
    },

    prevLinkItem() {
      return typeof this.currentLinkIndex === 'number'
        ? this.sidebarLinks[this.currentLinkIndex - 1]
        : null
    },

    nextLinkItem() {
      return typeof this.currentLinkIndex === 'number'
        ? this.sidebarLinks[this.currentLinkIndex + 1]
        : null
    }
  }
}
</script>

<style scoped>
.prev-next-links {
  overflow: auto;
  margin-top: 40px;
  padding-top: 30px;
  border-top: 1px solid var(--border-color);

  @media print {
    display: none;
  }
}

.prev-link {
  float: left;
}

.next-link {
  float: right;
}
</style>
