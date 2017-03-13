<template>
  <header class="mobile-header is-mobile-flex" ref="header">
    <div class="header-left" @click="toggleMobileSidebar()">
      <h1 class="site-title">
        <svg-icon class="svg-icon" name="menu" ref="icon"></svg-icon>
        <span v-if="!config.disableHeaderTitle">{{ config.title }}</span>
      </h1>
    </div>
    <div class="header-right">
      <header-icons :current-icons="currentIcons"></header-icons>
    </div>
  </header>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import HeaderIcons from 'components/HeaderIcons.vue'
  import SvgIcon from 'components/SvgIcon'
  import { $, isMobile } from 'utils/dom'

  export default {
    props: {
      currentIcons: {
        type: Array,
        default: () => []
      }
    },
    computed: {
      ...mapState(['config', 'showMobileSidebar'])
    },
    mounted() {
      this.$watch('showMobileSidebar', () => {
        const { icon } = this.$refs
        const el = $('.sidebar')
        if (el.classList.contains('visible')) {
          el.classList.remove('visible')
          icon.style.color = '#999'
        } else {
          el.classList.add('visible')
          icon.style.color = '#333'
        }
      })

      document.addEventListener('click', e => {
        const { header } = this.$refs
        const sidebar = $('.sidebar')
        if (
          isMobile &&
          header &&
          !sidebar.contains(e.target) &&
          !header.contains(e.target)
        ) {
          this.toggleMobileSidebar(false)
        }
      })
    },
    methods: {
      ...mapActions(['toggleMobileSidebar'])
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
      font-size: 20px;
      display: flex;
      align-items: center;
    }

    .header-left {
      cursor: pointer;
      user-select: none;
      .svg-icon {
        margin-right: 10px;
        color: #999;
        width: 24px;
      }
    }
  }
</style>

