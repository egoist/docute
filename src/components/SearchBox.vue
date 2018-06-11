<template>
  <div class="search-box">
    <SearchIcon class="search-xxx" />
    <input class="search-keyword" type="text" v-model="keyword">
    <div class="search-result">
      <div class="search-result-item">
        hello
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import event from '../utils/event'

export default {
  data() {
    return {
      keyword: '',
      searchIndex: []
    }
  },

  computed: {
    ...mapGetters(['siteConfig'])
  },

  watch: {
    keyword(v) {
      if (v) {
        event.$emit('search', v)
      }
    }
  }
}
</script>

<style scoped>
.search-box {
  border: 1px solid var(--border-color);
  border-radius: 33px;
  padding: 5px 8px;
  display: flex;
  align-items: center;
  color: #969696;
  width: 200px;
  position: relative;
}

.search-keyword {
  border: none;
  outline: none;
  padding-left: 5px;
  font-size: 14px;
  width: 100%;
}

.search-result {
  position: absolute;
  left: 0;
  top: calc(100% + 5px);
  border: 1px solid var(--border-color);
  border-radius: 4px;
  background: var(--bg);
  padding: 10px;
  width: 20rem;
}
</style>
