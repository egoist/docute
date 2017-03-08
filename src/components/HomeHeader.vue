<template>
  <header class="header is-desktop is-fixed" v-if="currentNav.length > 0 || currentIcons.length > 0">
    <header-nav :current-icons="currentIcons"></header-nav>
  </header>
</template>

<script>
  import {mapGetters} from 'vuex'
  import HeaderNav from 'components/HeaderNav.vue'

  export default {
    props: {
      currentIcons: {
        type: Array
      }
    },
    computed: {
      ...mapGetters(['currentNav'])
    },
    components: {
      HeaderNav
    }
  }
</script>

<style>
  .header {

    margin-bottom: 20px;
    height: 40px;
    border-bottom: 1px solid rgba(0,0,0,.07);
    &:empty {
      display: none;
    }
    &.is-fixed {
      position: fixed;
      top: 0;
      left: 280px;
      right: 0;
      background-color: white;
      z-index: 9999;
    }
  }

  .no-sidebar .header {
    left: 0;
    margin: 0 auto;
    max-width: 1000px;
    border-left: 1px solid rgba(0,0,0,.07);
    border-right: 1px solid rgba(0,0,0,.07);
  }
</style>

<style>
  @media screen and (max-width: 768px) {
    .header {
      padding: 0 10px;
    }
  }
</style>
