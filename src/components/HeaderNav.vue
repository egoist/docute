<template>
  <div class="header-nav">
    <div class="header-nav-item" v-for="(item, index) in nav" :key="index">
      <div class="dropdown-wrapper" v-if="item.children">
        <span class="dropdown-trigger">
          {{ item.title }}
          <span class="arrow"></span>
        </span>
        <ul class="dropdown-list" v-if="item.children">
          <li
            class="dropdown-item"
            v-for="(childItem, index) in item.children"
            :key="index"
          >
            <uni-link
              :to="childItem.link"
              :openInNewTab="childItem.openInNewTab"
              :externalLinkIcon="false"
              >{{ childItem.title }}</uni-link
            >
          </li>
        </ul>
      </div>

      <uni-link
        v-if="!item.children"
        :to="item.link"
        :openInNewTab="item.openInNewTab"
        :externalLinkIcon="false"
        >{{ item.title }}</uni-link
      >
    </div>
  </div>
</template>

<script>
import {isExternalLink} from '../utils'
import UniLink from './UniLink.vue'

export default {
  components: {
    UniLink
  },

  props: {
    nav: {
      type: Array,
      required: true
    }
  },

  methods: {
    isExternalLink
  }
}
</script>

<style scoped>
.header-nav {
  display: flex;
  align-items: center;
  font-size: 1rem;

  @media (max-width: 768px) {
    display: none;
  }
}

/deep/ a {
  color: var(--nav-link-color);
}

.header-nav-item {
  height: 100%;

  &:not(:first-child) {
    margin-left: 25px;
  }

  & > /deep/ a {
    display: inline-flex;
    align-items: center;
    line-height: 1.4;
    height: 100%;
    position: relative;

    &:after {
      content: '';
      height: 2px;
      width: 100%;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      display: block;
    }

    &.router-link-exact-active {
      color: var(--accent-color);
      &:after {
        background-color: var(--nav-link-border-color);
      }
    }
  }
}

.mobile-header-nav {
  display: block;
  padding: 0 20px;
  margin-bottom: 30px;
  padding-bottom: 30px;
  border-bottom: 1px solid var(--border-color);

  & .header-nav-item {
    &:not(:first-child) {
      margin-left: 0;
    }
  }

  @media (min-width: 768px) {
    display: none;
  }
}

.arrow {
  display: inline-block;
  vertical-align: middle;
  margin-top: -1px;
  margin-left: 6px;
  margin-right: -14px;
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 5px solid #ccc;
}

.dropdown-wrapper {
  position: relative;

  &:hover .dropdown-list {
    display: block;
  }
}

.dropdown-trigger {
  &:hover {
    cursor: default;
  }
}

.dropdown-list {
  display: none;
  list-style: none;
  margin: 0;
  padding: 5px 0;
  padding-left: 0;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  position: absolute;
  right: 0;
  top: 100%;
  background: var(--header-background);

  @media (max-width: 768px) {
    position: relative;
  }
}

.dropdown-item {
  line-height: 1.6;

  & /deep/ a {
    padding: 2px 1.5rem 2px 1.25rem;
    white-space: nowrap;
    display: block;
    position: relative;

    &.router-link-exact-active {
      color: var(--accent-color);

      &:before {
        content: '';
        width: 0;
        height: 0;
        border-left: 5px solid #3eaf7c;
        border-top: 3px solid transparent;
        border-bottom: 3px solid transparent;
        position: absolute;
        top: calc(50% - 2px);
        left: 9px;
      }
    }
  }
}
</style>
