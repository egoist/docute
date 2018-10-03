<template>
  <div class="Sidebar" :class="{isShown: $store.state.showSidebar}">

        <div class="SiteTitle">
          <router-link to="/">{{ $store.getters.config.text }}</router-link>
        </div>

        <InjectedComponents position="sidebar:start" />

        <div class="SidebarItems">
          <div
            v-for="(item, index) in $store.getters.sidebar"
            :class="['SidebarItem', item.text && 'hasTitle']"
            :key="index">
            <div class="ItemTitle" v-if="item.text">
              {{ item.text }}
            </div>
            <template v-for="(link, index) of item.links">
              <a
                v-if="isExternalLink(link.link)"
                :key="index"
                :href="link.link"
                class="ItemLink"
                target="_blank">
                {{ link.text }} ↗
              </a>
              <router-link
                v-else
                :key="index"
                :to="link.link"
                class="ItemLink"
                :class="{active: $route.path === link.link}">
                {{ link.text }}
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
  width: var(--sidebar-width);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 9;
  color: var(--text-color);
  overflow-y: auto;
  padding: 0 0 20px 0;
  border-right: 1px solid var(--border-color);
  background: white;

  & a {
    color: var(--text-color);
    text-decoration: none;
  }
}

.SiteTitle {
  font-size: 1.5rem;
  font-weight: 500;
  height: var(--header-height);
  line-height: var(--header-height);
  padding: 0 20px;
  border-bottom: 1px solid var(--border-color);
}

.SidebarItem {
  margin-top: 1.6rem;

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

  &:hover {
    color: var(--accent-color);
  }

  &.active {
    box-shadow: inset 2px 0 0 0 #ccc;
    background: #f0f0f0;
    font-weight: 500;
    color: var(--accent-color);
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
    background: transprent;
    display: block;
    top: 50%;
    margin-top: -2px;
    left: -10px;
    border-radius: 50%;
  }

  &:hover,
  &.router-link-exact-active {
    font-weight: 500;
    color: var(--accent-color);
  }
}
</style>

<style scoped>
@import 'vars.css';

@media screen and (max-width: 768px) {
  .Sidebar {
    transform: translateX(-100%);
    width: 80%;
    top: var(--header-height);
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
