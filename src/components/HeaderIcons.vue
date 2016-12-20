<template>
  <div class="header-icons" v-if="currentIcons.length > 0">
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
      <span class="icon-html" v-if="icon.html" v-html="icon.html"></span>
      <svg v-if="icon.svgId" :class="icon.svgClass">
        <use :xlink:href="`#${icon.svgId}`" />
      </svg>
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
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      color: #666;
      &:not(:first-child) {
        margin-left: 20px;
      }
      &:hover {
        color: #333;
        svg {
          color: #333;
        }
      }
    }
    svg {
      width: 22px;
      height: 22px;
      color: #666;
    }
  }
</style>
