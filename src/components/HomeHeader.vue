<template>
  <header class="header is-desktop" v-if="currentNav.length > 0 || currentIcons.length > 0">
    <header-nav></header-nav>
    <header-icons :current-icons="currentIcons"></header-icons>
  </header>
</template>

<script>
  import {mapGetters} from 'vuex'
  import HeaderNav from 'components/HeaderNav.vue'
  import HeaderIcons from 'components/HeaderIcons.vue'

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
      HeaderNav,
      HeaderIcons
    }
  }
</script>

<style>
  .header {
    padding: 0 30px;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &:empty {
      display: none;
    }
  }
</style>

<style>
  @media screen and (max-width: 768px) {
    .header {
      padding: 0 10px;
    }
  }
</style>
