<template>
  <div class="sidebar-toggle inner-x">
    <svg-icon @click="toggleSidebar()" class="toggle-trigger" name="menu"></svg-icon>
  </div>
</template>

<script>
  import SvgIcon from 'components/SvgIcon'
  import { mapActions } from 'vuex'

  export default {
    methods: {
      ...mapActions(['toggleSidebar'])
    },
    components: {
      SvgIcon
    }
  }
</script>

<style>
  .sidebar-toggle {
    position: fixed;
    bottom: 0;
    width: 260px;
    height: 50px;
    z-index: 7000;
    background-color: rgba(252, 252, 252, 0.83);
    display: flex;
    align-items: center;
    user-select: none;
    .toggle-trigger {
      color: #666;
      cursor: pointer;
      &:hover {
        color: #333;
      }
      svg {
        width: 22px;
      }
    }
    .no-sidebar & {
      background-color: transparent;
      width: auto;
    }
  }
  @media screen and (max-width: 768px) {
    .sidebar-toggle {
      display: none;
    }
  }
</style>
