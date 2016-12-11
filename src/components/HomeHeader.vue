<template>
  <header class="header">
    <ul class="nav" v-if="currentNav && currentNav.length > 0">
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
              <router-link
                class="router-link"
                :class="{'router-link-active': subItem.path === $route.path}"
                :to="subItem.path"
                exact>
                {{ subItem.title }}
              </router-link>
            </li>
          </ul>
        </div>
        <router-link
          v-else
          class="router-link"
          :class="{'router-link-active': navItem.path === $route.path}"
          :to="navItem.path"
          exact>
          {{ navItem.title }}
        </router-link>
      </li>
    </ul>
    <div class="header-icons">
      <a
        v-if="config.repo"
        class="header-icon"
        target="_blank"
        :href="`https://github.com/${config.repo}`">
        <svg-icon name="github"></svg-icon>
      </a>
      <a
        v-if="config.twitter"
        class="header-icon"
        target="_blank"
        :href="`https://twitter.com/${config.twitter}`">
        <svg-icon name="twitter"></svg-icon>
      </a>
    </div>
  </header>
</template>

<script>
  import {mapState, mapActions, mapGetters} from 'vuex'
  import SvgIcon from 'components/SvgIcon'

  export default {
    computed: {
      ...mapState({
        config: state => state.config,
        attributes: state => state.attributes
      }),
      ...mapGetters(['currentTitle', 'currentNav']),
    },
    methods: {
      ...mapActions(['toggleDropdown'])
    },
    components: {
      SvgIcon
    }
  }
</script>

<style>
  .header {
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    &:empty {
      display: none;
    }
    .header-icons {
      .header-icon {
        margin-left: 20px;
      }
      svg {
        width: 22px;
      }
    }
    .nav {
      list-style: none;
      padding-left: 0;
      margin: 0;
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
