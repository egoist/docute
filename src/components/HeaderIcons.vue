<template>
  <div class="header-icons">
    <a
      v-for="(icon, index) in currentIcons"
      class="header-icon hint--rounded"
      :class="{
        'hint--bottom': index !== currentIcons.length - 1,
        'hint--bottom-left': index === currentIcons.length - 1
      }"
      target="_blank"
      :aria-label="icon.label"
      :href="icon.link">
      <svg-icon v-if="icon.svg" :name="icon.svg" class="svg-icon"></svg-icon>
    </a>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import SvgIcon from 'components/SvgIcon'

  export default {
    computed: {
      ...mapGetters(['currentIcons'])
    },
    components: {
      SvgIcon
    }
  }
</script>

<style>
  .svg-icon {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .header-icons {
    display: flex;
    .header-icon {
      margin-left: 20px;
      &:hover {
        svg {
          color: #333;
        }
      }
    }
    svg {
      width: 22px;
      color: #666;
    }
  }
</style>
