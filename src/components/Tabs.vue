<template>
  <other-tabs>
    <tab v-for="(title, index) in titles" :key="title" :title="title">{{
      bodies[index]
    }}</tab>
  </other-tabs>
</template>

<script>
import {Tabs as otherTabs, Tab} from 'vue-slim-tabs'

export default {
  name: 'Tabs',
  components: {
    otherTabs,
    Tab
  },
  props: {
    titles: {
      type: Array,
      required: true
    },
    bodies: {
      type: Array,
      require: true
    }
  }
}
</script>

<style src="vue-slim-tabs/themes/default.css"></style>
