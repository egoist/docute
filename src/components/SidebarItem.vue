<template>
  <div :class="['SidebarItem', item.title && 'hasTitle']">
    <div
      class="ItemTitle"
      v-if="item.title"
      :class="{collapsable: Boolean(children)}"
      @click="$emit('toggle')"
    >
      <span v-if="children" class="arrow" :class="{open}">
        <svg
          width="6"
          height="10"
          viewBox="0 0 6 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.4 8.56L4.67 5M1.4 1.23L4.66 4.7"
            stroke="#999"
            stroke-linecap="square"
          />
        </svg> </span
      >{{ item.title }}
    </div>
    <div class="ItemChildren" v-if="open">
      <div class="ItemChild" v-for="(link, index) of children" :key="index">
        <uni-link
          class="ItemLink"
          :to="link.link"
          :openInNewTab="link.openInNewTab"
          :prefetchFiles="getPrefetchFiles(link.link)"
          >{{ link.title }}</uni-link
        >
        <div
          class="LinkToc"
          v-if="
            !$store.state.fetchingFile &&
              link.toc !== false &&
              link.link === $route.path &&
              $store.state.page.headings &&
              $store.state.page.headings.length > 0
          "
          :key="`toc-${index}`"
        >
          <router-link
            class="TocHeading"
            :to="{hash: heading.slug}"
            :data-level="heading.level"
            v-for="heading in $store.state.page.headings"
            :key="heading.slug"
            v-html="heading.text"
          ></router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {isExternalLink, getFileUrl, getFilenameByPath} from '../utils'
import UniLink from './UniLink.vue'

export default {
  components: {
    UniLink
  },
  props: {
    item: {
      type: Object,
      required: true,
      default() {
        return {}
      }
    },
    open: {
      type: Boolean,
      required: false,
      default() {
        return true
      }
    }
  },
  computed: {
    children() {
      return this.item.children || this.item.links || []
    }
  },
  methods: {
    isExternalLink,

    getPrefetchFiles(path) {
      const {sourcePath, routes} = this.$store.getters.config
      if (routes && routes[path]) {
        const {file} = routes[path]
        return file ? [file] : []
      }
      const filename = getFilenameByPath(path)
      const fileUrl = getFileUrl(sourcePath, filename)
      return fileUrl ? [fileUrl] : []
    },

    getLinkTarget(link) {
      if (!isExternalLink(link) || link.openInNewTab === false) {
        return '_self'
      }
      return '_blank'
    }
  }
}
</script>

<style scoped>
.SidebarItem {
  &:not(:last-child) {
    margin-bottom: 10px;
  }

  font-size: 0.875rem;

  & a {
    color: var(--sidebar-link-color);

    &:hover {
      color: var(--sidebar-link-active-color);
    }
  }
}

.ItemTitle {
  padding: 0 20px;
  margin-bottom: 10px;
  position: relative;
  color: var(--sidebar-section-title-color);
  text-transform: uppercase;

  &.collapsable {
    &:hover {
      cursor: pointer;
    }
  }
}

.ItemChildren {
  border-left: 1px solid var(--border-color);
  margin: 0 20px;
}

.ItemChild {
  &:not(:last-child) {
    margin-bottom: 10px;
  }
}

.ItemLink {
  padding: 0 12px;
  display: flex;
  position: relative;
  line-height: 1;

  &.active {
    font-weight: bold;
  }
}

.LinkToc {
  border-left: 1px solid var(--border-color);
  margin-left: 12px;
  margin-top: 10px;
}

.TocHeading {
  display: flex;
  line-height: 1;
  position: relative;

  &:not(:last-child) {
    margin-bottom: 8px;
  }

  &[data-level='2'] {
    margin-left: 12px;
  }

  &[data-level='3'] {
    margin-left: 24px;
  }

  &.router-link-exact-active {
    font-weight: bold;
    color: var(--sidebar-link-active-color);
  }
}

a {
  text-decoration: none;
  color: var(--text-color);
}

.arrow {
  width: 12px;
  display: inline-block;

  & svg {
    transition: all 0.15s ease;
  }

  &.open {
    & svg {
      transform: rotate(90deg);
    }
  }
}
</style>
