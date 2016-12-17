<template>
  <div class="search-form"
    :class="{focus}">
    <input
      v-if="pluginSearch"
      type="text"
      autofocus
      placeholder="Type to search..."
      class="search-box inner-x"
      ref="input"
      v-model="keyword"
      @focus="toggleFocus"
      @blur="toggleFocus"
      @keydown.enter="handleSearch(keyword)">
    <svg-icon name="close" class="svg-icon" v-if="keyword" @click="handleClear"></svg-icon>
    <svg-icon name="search" class="svg-icon" v-else></svg-icon>
  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex'
  import SvgIcon from 'components/SvgIcon'

  export default {
    data() {
      return {
        keyword: this.$route.query.keyword || '',
        focus: false
      }
    },
    mounted() {
      this.search(this.keyword)
      this.$watch('searchKeyword', val => {
        this.keyword = val
      })
    },
    computed: {
      ...mapState(['config', 'searchKeyword', 'pluginSearch'])
    },
    methods: {
      ...mapActions(['search', 'updateSearchKeyword', 'searchReset']),
      handleSearch(keyword) {
        if (keyword === this.$route.query.keyword) {
          // when keyword is already the same as in url query
          this.search(keyword)
        } else {
          // otherwise update url query
          this.$router.push({query: {...this.$route.query, keyword}})
          this.search(keyword)
        }
      },
      toggleFocus() {
        this.focus = !this.focus
      },
      handleClear() {
        this.searchReset()
        this.$refs.input.focus()
      }
    },
    components: {
      SvgIcon
    }
  }
</script>

<style>
  .search-form {
    position: relative;
    border-bottom: 1px solid rgba(0,0,0,.07);
    height: 40px;
    &.focus {
      .svg-icon {
        color: #333;
      }
    }
    .svg-icon {
      cursor: pointer;
      top: 0;
      height: 40px;
      width: 40px;
      position: absolute;
      right: 10px;
      color: rgba(0,0,0,.22);
      svg {
        width: 14px;
        height: 14px;
      }
      &:hover {
        color: #f66;
      }
    }
  }
  .search-box {
    height: 100%;
    border: none;
    width: 100%;
    outline: none;
    font-size: 14px;
  }
  .search-icon {
  }
</style>
