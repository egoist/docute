<template>
  <div>
    <other-tabs>
      <tab
        v-for="(item, index) in all"
        :key="item.title + item.body"
        :title="item.title"
        v-html="transformed[index]"
      >
      </tab>
    </other-tabs>
  </div>
</template>

<script>
import {Tabs as otherTabs, Tab} from 'vue-slim-tabs'
import inlineRender from '../utils/inlineRender'

export default {
  name: 'Tabs',
  data() {
    return {
      transformed: []
    }
  },
  created() {
    const that = this
    const {all} = this
    Promise.all(
      all.map(x => {
        const {codeBlock, markdown, body} = x
        const nl = '\n'
        if (codeBlock) {
          const a = inlineRender('```' + codeBlock + nl + body + nl + '```')
          return a
        }
        if (markdown) {
          return inlineRender(body)
        }
        return body
      })
    ).then(x => {
      that.transformed = x
    })
  },
  components: {
    otherTabs,
    Tab
  },
  props: {
    all: {
      type: Array,
      required: true
    }
  }
}
</script>

<style src="vue-slim-tabs/themes/default.css"></style>
