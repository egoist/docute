<template>
  <div class="Sidebar" :class="{isShown: $store.state.showSidebar}">

        <div class="SiteTitle">
          {{ $store.getters.config.title }}
        </div>

        <InjectedComponents position="sidebar:start" />

        <div class="SidebarNav">
          <div
            :class="['NavItem', navItem.title && 'hasTitle']"
            v-for="(navItem, index) in $store.getters.config.nav"
            :key="index">
            <div class="NavItemTitle" v-if="navItem.title">
              {{ navItem.title }}
            </div>
            <template v-for="(navLink, index) of navItem.links">
              <a
                v-if="isExternalLink(navLink.link)"
                :key="index"
                :href="navLink.link"
                class="NavLink"
                target="_blank">
                {{ navLink.title }} ↗
              </a>
              <router-link
                v-else
                :key="index"
                :to="navLink.link"
                class="NavLink"
                :class="{active: $route.path === navLink.link}">
                {{ navLink.title }}
              </router-link>
              <div
                class="NavToc"
                v-if="!$store.state.fetchingFile &&
                navLink.toc !== false &&
                navLink.link === $route.path &&
                $store.state.page.headings &&
                $store.state.page.headings.length > 0"
                :key="`toc-${index}`">
                <router-link
                  class="NavTocHeading"
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
import { isExternalLink } from '../utils'

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
  background: var(--accent-color);
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

.NavItem {
  &:not(:last-child) {
    border-bottom: 1px solid rgba(255,255,255,.15);
    padding-bottom: 2rem;
    margin-bottom: 2rem;
  }

  &.hasTitle {
    & .NavLink {
      font-size: .9rem;
    }
  }

  &.hasTitle >>> .NavTocHeading {
    font-size: .9rem;
  }
}

.NavItemTitle {
  font-size: 1.2rem;
  font-style: italic;
  padding: 0 20px;
  margin-bottom: 10px;
  font-weight: 500;
  position: relative;
}

.NavLink {
  padding: 2px 20px;
  display: flex;
  font-size: 1.1rem;
  position: relative;

  &.active,
  &:hover {
    background: rgba(255, 255, 255, 0.15);
  }
}

.NavTocHeading {
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

  &[data-level="2"] {
    margin-left: 35px;
  }

  &[data-level="3"] {
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
@import "vars.css";

@media screen and (max-width: 768px) {
  .Sidebar {
    transform: translateX(-100%);
    width: 80%;
    top: var(--mobile-header-height);
    transition: transform .5s cubic-bezier(.50,.32,.01,1);

    &.isShown {
      transform: translateX(0);
    }
  }

  .SiteTitle {
    display: none;
  }
}
</style>
