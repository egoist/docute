<template>
  <div class="sidebar-overlay" v-if="showSidebar" @click="toggleSidebar()"></div>
</template>

<script>
  import {mapState, mapActions} from 'vuex'

  export default {
    computed: {
      ...mapState(['showSidebar'])
    },
    methods: {
      ...mapActions(['toggleSidebar'])
    }
  }
</script>

<style scoped>
  .sidebar-overlay {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 7000;
    background-color: rgba(255, 255, 255, 0.68);
  }
</style>
