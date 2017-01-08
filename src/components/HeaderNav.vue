<template>
  <div class="header-nav" v-if="showNav">
    <custom-components place="nav:start"></custom-components>
    <ul class="nav-list" v-if="hasNav">
      <li
        v-for="(navItem, index) in currentNav"
        class="nav-item">
        <div
          class="nav-item-dropdown"
          v-if="navItem.type === 'dropdown'">
          {{ getTitle(navItem) }}
          <span class="arrow"></span>
          <ul class="dropdown-list">
            <li
              v-for="subItem in navItem.items"
              :style="{padding: subItem.type === 'sep' ? '0' : '0 20px'}"
              class="dropdown-item">
              <span v-if="subItem.type === 'sep'" class="sep"></span>
              <span v-else-if="subItem.type ==='label'" class="label">{{ subItem.title }}</span>
              <nav-link v-else :item="subItem"></nav-link>
            </li>
          </ul>
        </div>
        <nav-link v-else :item="navItem"></nav-link>
      </li>
    </ul>
    <custom-components place="nav:end"></custom-components>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import SvgIcon from 'components/SvgIcon'
  import NavLink from 'components/NavLink'
  import CustomComponents from 'components/CustomComponents'
  import componentManager from 'utils/component-manager'

  export default {
    computed: {
      ...mapGetters(['currentNav']),
      hasNav() {
        return this.currentNav && this.currentNav.length > 0
      },
      showNav() {
        const hasNavStart = componentManager.count('nav:start') > 0
        const hasNavEnd = componentManager.count('nav:end') > 0
        return this.hasNav || hasNavStart || hasNavEnd
      }
    },
    methods: {
      getTitle(item) {
        if (!item.exact) {
          return item.title
        }
        const subItems = item.items
        const match = subItems.filter(subItem => {
          return subItem.path === this.$route.path
        })[0]
        if (match) {
          return match.title
        }
        return item.title
      }
    },
    components: {
      SvgIcon,
      NavLink,
      CustomComponents
    }
  }
</script>

<style>
  .header-nav {
    display: flex;
    align-items: center;
  }
  .nav-list {
    list-style: none;
    padding-left: 0;
    margin: 0;
    line-height: 30px;
    height: 30px;
    .sep {
      height: 1px;
      background-color: #f0f0f0;
      display: block;
      margin: 8px 0;
    }
    .label {
      display: block;
      margin-top: 5px;
      font-weight: bold;
      font-size: 14px;
    }
    .nav-item {
      float: left;
      margin-right: 20px;
      >a, >div {
        color: #666;
        border-bottom: 3px solid transparent;
        display: block;
        &.router-link-active {
          border-bottom-color: #42b983;
          color: #333;
        }
        &:hover {
          color: #333;
        }
      }
      .arrow {
        display: inline-block;
        vertical-align: middle;
        margin-top: -1px;
        margin-left: 6px;
        width: 0;
        height: 0;
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
        border-top: 5px solid #ccc;
      }
    }
    .nav-item-dropdown {
      position: relative;
      .dropdown-list {
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        display: none;
        background-color: white;
        margin: 0;
        list-style-type: none;
        border: 1px solid #e2e2e2;
        border-radius: 3px;
        white-space: nowrap;
        padding: 10px 0;
        .dropdown-item {
          font-size: 13px;
          line-height: 28px;
          .router-link:hover, .router-link-active {
            color: #42b983;
          }
        }
      }
      &:hover {
        .dropdown-list {
          display: block;
        }
      }
    }
  }
</style>
