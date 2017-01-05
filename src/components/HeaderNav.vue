<template>
  <ul class="header-nav" v-if="currentNav && currentNav.length > 0">
    <li
      v-for="(navItem, index) in currentNav"
      class="nav-item">
      <div
        class="nav-item-dropdown"
        v-if="navItem.type === 'dropdown'">
        {{ navItem.title }}
        <span class="arrow"></span>
        <ul class="dropdown-list">
          <li
            v-for="subItem in navItem.items"
            class="dropdown-item">
            <nav-link :item="subItem"></nav-link>
          </li>
        </ul>
      </div>
      <nav-link v-else :item="navItem"></nav-link>
    </li>
  </ul>
</template>

<script>
  import {mapState, mapActions, mapGetters} from 'vuex'
  import SvgIcon from 'components/SvgIcon'
  import NavLink from 'components/NavLink'
  import {isMobile} from 'utils/dom'

  export default {
    data() {
      return {
        isMobile
      }
    },
    computed: {
      ...mapState(['attributes']),
      ...mapGetters(['currentTitle', 'currentNav']),
    },
    methods: {
      ...mapActions(['toggleDropdown', 'toggleSidebar'])
    },
    components: {
      SvgIcon,
      NavLink
    }
  }
</script>

<style>
  .header-nav {
    list-style: none;
    padding-left: 0;
    margin: 0;
    line-height: 30px;
    height: 30px;
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
          padding: 0 20px;
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
    &.is-mobile {
      height: auto;
      line-height: auto;
      .nav-item {
        float: none;
        >a, >div {
          border-bottom: none;
          &.router-link-active {
            color: #42b983;
          }
        }
      }
      .dropdown-list {
        background-color: transparent;
      }
      .nav-item-dropdown {
        .dropdown-list {
          position: initial;
          display: block;
          transform: none;
          border: none;
          padding: 0;
        }
      }
    }
  }
</style>
