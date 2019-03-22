<template>
  <div class="Sidebar" :class="{isShown: $store.state.showSidebar}">
    <InjectedComponents position="sidebar:start" />

    <MobileHeaderNav
      v-if="$store.getters.config.nav"
      :nav="$store.getters.config.nav"
    />

    <div class="SidebarItems">
      <div
        v-for="(item, index) in $store.getters.sidebar"
        :class="['SidebarItem', item.title && 'hasTitle']"
        :key="index"
      >
        <div class="ItemTitle" v-if="item.title">{{ item.title }}</div>
        <template v-for="(link, index) of item.links">
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
    </div>

    <InjectedComponents position="sidebar:end" />
  </div>
</template>

<script>
import {isExternalLink, getFileUrl, getFilenameByPath} from '../utils'
import MobileHeaderNav from './MobileHeaderNav.vue'

export default {
  components: {
    MobileHeaderNav
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
    }
  }
}
</script>

<style scoped>
.Sidebar {
  width: var(--sidebar-width);
  background: var(--sidebar-background);
  position: fixed;
  top: var(--header-height);
  bottom: 0;
  z-index: 9;
  overflow-y: auto;
  padding: 30px 0;
  word-break: break-word;
  border-right: 1px solid var(--border-color);

  & a {
    text-decoration: none;
    color: #000;
  }

  @media (max-width: 768px) {
    left: 0;
    transform: translateX(-100%);
    width: 80%;
    transition: transform 0.5s cubic-bezier(0.5, 0.32, 0.01, 1);

    &.isShown {
      transform: translateX(0);
    }
  }
}

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
</style>
