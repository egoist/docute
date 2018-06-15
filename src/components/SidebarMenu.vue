<template>
  <div class="sidebar-menu-loader" v-if="headings === null">
    <ListLoader v-if="headings === null" />
  </div>
  <div class="sidebar-menu" v-else>
    <div class="menu-item"
      :class="{
        'menu-item-group': Boolean(item.children),
        'menu-item-sep': item.type === 'sep'
      }"
      v-for="(item, index) in siteConfig.sidebar"
      :key="index">
      <span v-if="item.type"></span>
      <router-link
        :to="item.link"
        class="item-link"
        :class="{active: $route.path === item.link}"
        v-else-if="item.link">
        {{ item.text }}
      </router-link>
      <div class="item-heading" v-else>
        {{ item.text }}
      </div>
      <SideberItemHeaders
        v-if="item.link && item.link === $route.path"
        :headers="headers"
      />
      <div class="item-children" v-if="item.children">
        <div
          class="item-child"
          v-for="(child, index) of item.children"
          :key="index">
          <router-link
            class="item-link"
            :class="{active: $route.path === child.link}" :to="child.link">
            {{ child.text }}
          </router-link>
          <SideberItemHeaders
            v-if="child.link === $route.path"
            :headers="headers"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { ListLoader } from 'vue-content-loader'
import SideberItemHeaders from './SideberItemHeaders.vue'
import groupHeaders from '../utils/group-headers'

export default {
  props: ['headings'],

  computed: {
    ...mapGetters(['siteConfig']),

    headers() {
      return this.headings && groupHeaders(this.headings)
    }
  },

  components: {
    SideberItemHeaders,
    ListLoader
  }
}
</script>

<style scoped>
.sidebar-menu {
  padding: var(--padding) 0;
}

.menu-item:not(:last-child) {
  margin-bottom: 10px;
}

.menu-item {
  &.menu-item-sep {
    margin: 15px 0;
    /* padding: 0 var(--padding); */
    position: relative;
    &:after {
      content: '';
      display: block;
      height: 1px;
      background: var(--border-color);
    }
  }
}

.item-sep {
  height: 1px;
  background: var(--border-color);
}

.item-heading {
  padding: 0 var(--padding);
  font-weight: bold;
}

.item-children {
  margin-top: 8px;
}

.item-child {
  /deep/ > .sidebar-item-headers {
    margin-left: 10px;
  }
}

.item-link {
  padding: 4px var(--padding);
  text-decoration: none;
  color: inherit;
  display: flex;
  border-left: 3px solid transparent;
  &:hover,
  &.active {
    color: var(--accent-color);
  }
  &.active {
    font-weight: 500;
    border-left-color: var(--accent-color);
  }
}

.menu-item-group {
  .item-link {
    padding-left: calc(var(--padding) + 10px);
  }
}

.sidebar-menu-loader {
  padding: var(--padding);
}
</style>
