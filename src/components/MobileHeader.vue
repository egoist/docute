<template>
  <header class="mobile-header is-mobile-flex">
    <div class="header-left" @click="toggleSidebar()">
      <h1 class="site-title">
        <svg-icon class="svg-icon" name="menu" ref="icon"></svg-icon>
        {{ config.title }}
      </h1>
    </div>
    <div class="header-right">
      <header-icons></header-icons>
    </div>
  </header>
</template>

<script>
  import {mapState, mapActions} from 'vuex'
  import HeaderIcons from 'components/HeaderIcons.vue'
  import SvgIcon from 'components/SvgIcon'

  export default {
    computed: {
      ...mapState(['config', 'showSidebar'])
    },
    mounted() {
      this.$watch('showSidebar', () => {
        const {icon} = this.$refs
        const el = document.querySelector('.sidebar')
        if (el.classList.contains('visible')) {
          el.classList.remove('visible')
          document.body.style.overflow = 'auto'
          icon.style.color = '#999'
        } else {
          el.classList.add('visible')
          document.body.style.overflow = 'hidden'
          icon.style.color = '#333'
        }
      })
    },
    methods: {
      ...mapActions(['toggleSidebar'])
    },
    components: {
      HeaderIcons,
      SvgIcon
    }
  }
</script>

<style>
  .mobile-header {
    box-shadow: 0 0 2px rgba(0,0,0,0.25);
    padding: 0 10px;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 0;
    height: 50px;
    left: 0;
    right: 0;
    z-index: 9900;
    background-color: white;

    .site-title {
      margin: 0;
      font-weight: 300;
      font-size: 20x;
      display: flex;
    }

    .header-left {
      cursor: pointer;
      user-select: none;
      .svg-icon {
        margin-right: 10px;
        color: #999;
        margin-top: 1px;
        width: 24px;
      }
    }
  }
</style>


