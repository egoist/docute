<template>
  <div class="Sidebar" :class="{isShown: $store.state.showSidebar}">

        <div class="SiteTitle">
          <router-link to="/">{{ $store.getters.config.title }}</router-link>
        </div>

        <InjectedComponents position="sidebar:start" />

        <div class="SidebarItems">
          <div
            v-for="(item, index) in $store.getters.sidebar"
            :class="['SidebarItem', item.title && 'hasTitle']"
            :key="index">
            <div class="ItemTitle" v-if="item.title">
              {{ item.title }}
            </div>
            <template v-for="(link, index) of item.links">
              <a
                v-if="isExternalLink(link.link)"
                :key="index"
                :href="link.link"
                class="ItemLink"
                target="_blank">
                {{ link.title }} ↗
              </a>
              <router-link
                v-else
                :key="index"
                :to="link.link"
                class="ItemLink"
                :class="{active: $route.path === link.link}">
                {{ link.title }}
              </router-link>
              <div
                class="LinkToc"
                v-if="!$store.state.fetchingFile &&
                link.toc !== false &&
                link.link === $route.path &&
                $store.state.page.headings &&
                $store.state.page.headings.length > 0"
                :key="`toc-${index}`">
                <router-link
                  class="TocHeading"
                  :to="{hash: heading.slug}"
                  :data-level="heading.level"
                  v-for="heading in $store.state.page.headings"
                  :key="heading.slug"
                  v-html="heading.text">
                </router-link>
              </div>
            </template>
          </div>
        </div>

        <InjectedComponents position="sidebar:end" />

      </div>
</template>

<script>
import {isExternalLink} from '../utils'

export default {
  methods: {
    isExternalLink
  }
}
</script>


<style scoped>
@import 'vars.css';

.Sidebar {
  width: 250px;
  background: var(--sidebar-bg);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 9;
  color: white;
  overflow-y: auto;
  padding: 20px 0;

  & a {
    color: white;
    text-decoration: none;
  }
}

.SiteTitle {
  font-size: 1.8rem;
  font-weight: 300;
  padding: 20px;
  padding-top: 0;
  line-height: 1.2;
}

.SidebarItem {
  &:not(:last-child) {
    border-bottom: 1px solid rgba(255, 255, 255, 0.15);
    padding-bottom: 2rem;
    margin-bottom: 2rem;
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
  font-size: 1.2rem;
  font-style: italic;
  padding: 0 20px;
  margin-bottom: 10px;
  font-weight: 500;
  position: relative;
}

.ItemLink {
  padding: 2px 20px;
  display: flex;
  font-size: 1.1rem;
  position: relative;

  &.active,
  &:hover {
    background: rgba(255, 255, 255, 0.15);
  }
}

.TocHeading {
  display: flex;
  line-height: 1.4;
  margin-bottom: 3px;
  position: relative;

  &:first-child {
    margin-top: 5px;
  }

  &:last-child {
    margin-bottom: 5px;
  }

  &[data-level='2'] {
    margin-left: 35px;
  }

  &[data-level='3'] {
    margin-left: 50px;
  }

  &:before {
    position: absolute;
    content: '';
    height: 4px;
    width: 4px;
    background: transparent;
    display: block;
    top: 50%;
    margin-top: -2px;
    left: -10px;
    border-radius: 50%;
  }

  &:hover {
    &:before {
      background: rgba(228, 228, 228, 0.28);
    }
  }

  &.router-link-exact-active {
    &:before {
      background: white;
    }
  }
}
</style>

<style scoped>
@import 'vars.css';

@media screen and (max-width: 768px) {
  .Sidebar {
    transform: translateX(-100%);
    width: 80%;
    top: var(--mobile-header-height);
    transition: transform 0.5s cubic-bezier(0.5, 0.32, 0.01, 1);

    &.isShown {
      transform: translateX(0);
    }
  }

  .SiteTitle {
    display: none;
  }
}
</style>
