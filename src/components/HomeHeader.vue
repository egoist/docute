<template>
  <header class="header">
    <ul class="nav" v-if="nav && nav.length > 1">
      <li v-for="(navItem, index) in nav" class="nav-item">
        <div
          class="nav-item-dropdown"
          v-if="navItem.type === 'dropdown'">
          {{ navItem.title }}
          <span class="arrow"></span>
          <ul class="dropdown-list">
            <li
              v-for="subItem in navItem.items"
              class="dropdown-item">
              <router-link
                class="router-link"
                :to="subItem.link">
                {{ subItem.title }}
              </router-link>
            </li>
          </ul>
        </div>
        <router-link
          v-else
          class="router-link"
          :class="{'router-link-active': navItem.link === $route.path}"
          :to="navItem.link"
          exact>
          {{ navItem.title }}
        </router-link>
      </li>
    </ul>
  </header>
</template>

<script>
  import {mapState, mapActions, mapGetters} from 'vuex'

  export default {
    computed: {
      ...mapState({
        nav: state => state.config.nav
      }),
      ...mapGetters(['currentTitle'])
    },
    methods: {
      ...mapActions(['toggleDropdown'])
    }
  }
</script>

<style>
  .header {
    margin-bottom: 20px;
    &:empty {
      display: none;
    }
    .nav {
      list-style: none;
      padding-left: 0;
      margin: 0;
      display: inline-block;
      line-height: 30px;
      height: 30px;
      .nav-item {
        float: left;
        margin-right: 20px;
        >a, >div {
          border-bottom: 3px solid transparent;
          display: block;
          &.router-link-active {
            border-bottom-color: #42b983;
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
    }
  }
</style>
