<template>
  <header class="header is-desktop">
    <header-nav></header-nav>
    <header-icons></header-icons>
  </header>
</template>

<script>
  import HeaderNav from 'components/HeaderNav.vue'
  import HeaderIcons from 'components/HeaderIcons.vue'

  export default {
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
