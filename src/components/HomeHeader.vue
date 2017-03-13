<template>
  <header class="header is-desktop is-fixed" v-if="hasNav || currentIcons.length > 0">
    <div class="header-container">
      <header-nav
        :current-nav="currentNav"
        :has-nav="hasNav"
        :show-nav="showNav">
      </header-nav>
      <header-icons
        :current-icons="currentIcons"
        :show-nav="showNav">
      </header-icons>
    </div>
  </header>
</template>

<script>
  import { mapGetters } from 'vuex'
  import HeaderNav from 'components/HeaderNav.vue'
  import HeaderIcons from 'components/HeaderIcons.vue'

  export default {
    props: {
      currentIcons: {
        type: Array
      },
      hasNav: {
        type: Boolean
      },
      showNav: {
        type: Boolean
      }
    },
    computed: {
      ...mapGetters(['currentNav'])
    },
    components: {
      HeaderNav,
      HeaderIcons
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
    .header-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      max-width: 1000px;
      height: 100%;
      margin: 0 auto;
      padding: 0 30px;
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
