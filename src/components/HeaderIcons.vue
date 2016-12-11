<template>
  <div class="header-icons">
    <a
      v-if="config['edit-link']"
      class="header-icon hint--bottom hint--rounded"
      :class="{'hint--bottom': config.repo, 'hint-bottom-left': !config.repo}"
      target="_blank"
      aria-label="Edit this page"
      :href="editLink">
      <svg-icon name="edit" class="svg-icon"></svg-icon>
    </a>
    <a
      v-if="config.repo"
      class="header-icon hint--rounded"
      :class="{'hint--bottom': config.twitter, 'hint-bottom-left': !config.twitter}"
      target="_blank"
      aria-label="Start me on GitHub"
      :href="`https://github.com/${config.repo}`">
      <svg-icon name="github" class="svg-icon"></svg-icon>
    </a>
    <a
      v-if="config.twitter"
      class="header-icon hint--bottom-left hint--rounded"
      target="_blank"
      aria-label="Follow me on Twitter"
      :href="`https://twitter.com/${config.twitter}`">
      <svg-icon name="twitter" class="svg-icon"></svg-icon>
    </a>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import SvgIcon from 'components/SvgIcon'

  export default {
    computed: {
      ...mapState(['config']),
      editLink() {
        let filename = this.$route.path
        if (/\/$/.test(filename)) filename += 'README'
        return `${this.config['edit-link']}${filename}.md`
      }
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
    }
    svg {
      width: 22px;
      color: #999;
    }
  }
</style>
