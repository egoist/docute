<template>
  <div :class="['SidebarItem', item.title && 'hasTitle']">
    <div
      class="ItemTitle"
      v-if="item.title"
      :collapsable="item.collapsable"
      :class="{collapsable: item.collapsable}"
      @click="toggleDisplay"
    >
      {{ item.title }}
      <span
        v-if="item.collapsable"
        class="arrow"
        :class="open ? 'down' : 'right'"
      ></span>
    </div>
    <template v-if="open">
      <template v-for="(link, index) of children">
        <a
          v-if="isExternalLink(link.link)"
          :key="index"
          :href="link.link"
          class="ItemLink"
          target="_blank"
        >
          {{ link.title }}
          <external-link-icon />
        </a>
        <router-link
          v-else
          :key="index"
          :to="link.link"
          :prefetch-files="getPrefetchFiles(link.link)"
          class="ItemLink"
          :class="{active: $route.path === link.link}"
        >
          {{ link.title }}
        </router-link>
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
          >
          </router-link>
        </div>
      </template>
    </template>
  </div>
</template>
<script>
import {isExternalLink, getFileUrl, getFilenameByPath} from '../utils'

export default {
  props: {
    item: {
      type: Object,
      required: true,
      default() {
        return {}
      }
    }
  },
  data: () => ({
    open: true
  }),
  computed: {
    children() {
      return this.item.children || this.item.links || []
    }
  },
  created() {
    this.open = !this.item.collapsable
    const childLinks = this.children.map(child => child.link)
    if (childLinks.includes(this.$route.path)) {
      this.open = true
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
    toggleDisplay() {
      if (this.item.collapsable) {
        this.open = !this.open
      }
    }
  }
}
</script>
<style scoped>
.SidebarItem {
  &:not(:last-child) {
    margin-bottom: 1.2rem;
  }

  &.hasTitle {
    & .ItemLink {
      font-size: 0.9rem;
    }
  }

  &.hasTitle >>> .TocHeading {
    font-size: 0.9rem;
  }
}

.ItemTitle {
  font-size: 1rem;
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

.ItemLink {
  padding: 2px 20px;
  display: flex;
  font-size: 1.1rem;
  position: relative;

  &.active {
    font-weight: bold;
  }
}

.TocHeading {
  display: flex;
  line-height: 1.4;
  margin: 5px 0;
  position: relative;

  &[data-level='2'] {
    padding: 0 20px;
    &:before {
      content: '-';
      margin-right: 5px;
      color: #979797;
    }
  }

  &[data-level='3'] {
    padding: 0 20px 0 40px;
  }

  &.router-link-exact-active {
    font-weight: bold;
  }
}

a {
  text-decoration: none;
  color: var(--text-color);
}

.arrow {
  display: inline-block;
  position: relative;
  top: -0.1em;
  left: 0.5em;
  &.right {
    border-left: 6px solid #ccc;
    border-top: 4px solid transparent;
    border-bottom: 4px solid transparent;
  }

  &.down {
    border-top: 6px solid #ccc;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
  }
}
</style>
