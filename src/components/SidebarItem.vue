<template>
  <div :class="['SidebarItem', item.title && 'hasTitle']">
    <div class="ItemTitle" v-if="item.title" :collapsable="true">
      {{ item.title }}
    </div>
    <template v-for="(link, index) of getChildren(item)">
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
  </div>
</template>
<script>
import {isExternalLink, getFileUrl, getFilenameByPath} from '../utils'

export default {
  props: {
    collapsable: {
      type: Boolean,
      required: false,
      default() {
        return false
      }
    },
    item: {
      type: Object,
      required: true,
      default() {
        return {}
      }
    }
  },
  data: () => ({}),
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
    getChildren(item) {
      // backward compabillity
      return item.children || item.links || []
    }
  }
}
</script>
<style scoped>
.SidebarItem {
  &:not(:last-child) {
    padding-bottom: 1.2rem;
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
</style>
