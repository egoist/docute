<template>
  <div :class="['SidebarItem', item.title && 'hasTitle']">
    <div
      class="ItemTitle"
      :class="{collapsable: item.collapsable !== false}"
      v-if="item.title && children"
      @click="$emit('toggle')"
    >
      <span v-if="item.collapsable !== false" class="arrow" :class="{open}">
        <svg
          width="6"
          height="10"
          viewBox="0 0 6 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.4 8.56L4.67 5M1.4 1.23L4.66 4.7"
            stroke="currentColor"
            stroke-linecap="square"
          />
        </svg>
      </span>
      <span>{{ item.title }}</span>
    </div>
    <uni-link
      class="ItemLink"
      :class="{active: $route.path === item.link}"
      v-if="item.title && item.link"
      :to="item.link"
      >{{ item.title }}</uni-link
    >
    <div class="ItemLinkToc" v-if="item.title && item.link">
      <PageToc :link="item" />
    </div>

    <div
      class="ItemChildren"
      v-if="children && (open || item.collapsable === false)"
    >
      <div class="ItemChild" v-for="(link, index) of children" :key="index">
        <uni-link
          class="ItemChildLink"
          :class="{active: $route.path === link.link}"
          :to="link.link"
          :openInNewTab="link.openInNewTab"
          :prefetchFiles="getPrefetchFiles(link.link)"
          >{{ link.title }}</uni-link
        >
        <PageToc :link="link" />
      </div>
    </div>
  </div>
</template>

<script>
import {isExternalLink, getFileUrl, getFilenameByPath} from '../utils'
import UniLink from './UniLink.vue'
import PageToc from './PageToc.vue'

export default {
  components: {
    UniLink,
    PageToc
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
      return this.item.children || this.item.links
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

  & /deep/ a {
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
  color: var(--sidebar-link-color);
  user-select: none;
  font-size: 0;

  &.collapsable:hover {
    cursor: pointer;
    color: var(--sidebar-link-active-color);
  }

  & span {
    font-size: 0.9rem;
  }
}

.ItemLink {
  margin: 0 20px;
  display: flex;
  align-items: center;

  &:before {
    content: '';
    display: block;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: var(--sidebar-link-arrow-color);
    margin-right: 8px;
  }

  &.active {
    color: var(--sidebar-link-active-color);
    font-weight: bold;
  }
}

.ItemLinkToc {
  margin: 0 8px;
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

.ItemChildLink {
  padding-left: 16px;
  display: flex;
  position: relative;
  line-height: 1;

  &.active {
    font-weight: bold;
  }
}

a {
  text-decoration: none;
  color: var(--text-color);
}

.arrow {
  width: 16px;
  display: inline-block;
  color: var(--sidebar-link-arrow-color);

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
