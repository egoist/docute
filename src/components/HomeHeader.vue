<template>
  <header class="header">
    <ul class="nav" v-if="nav && nav.length > 1">
      <li v-for="navItem in nav" class="nav-item">
        <router-link class="router-link" :to="navItem.link" exact>
          {{ navItem.title }}
        </router-link>
      </li>
    </ul>
  </header>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    computed: {
      ...mapState({
        nav: state => state.config.nav
      })
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
      overflow: auto;
      .nav-item {
        float: left;
        margin-right: 20px;
      }
      .router-link {
        border-bottom: 3px solid transparent;
        line-height: 30px;
        height: 30px;
        display: block;
        &.router-link-active {
          border-bottom-color: #42b983;
        }
      }
    }
  }
</style>
