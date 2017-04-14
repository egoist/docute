<template>
  <div class="search-form"
    :class="{focus}">
    <input
      type="text"
      :placeholder="searchState.placeHolder"
      class="search-box inner-x"
      ref="input"
      v-model="keyword"
      @focus="toggleFocus"
      @blur="toggleFocus"
      @input="handleSearch(keyword)">
    <svg-icon name="close" class="svg-icon close" v-if="keyword" @click="handleClear"></svg-icon>
    <svg-icon name="search" class="svg-icon do-search" v-else @click="handleSearch(keyword)"></svg-icon>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import SvgIcon from 'components/SvgIcon'

  export default {
    data() {
      return {
        keyword: this.$route.query.keyword || '',
        focus: false,
        debouncedURLChange: setTimeout(() => {}, 0)
      }
    },
    mounted() {
      this.search(this.keyword)
      this.$watch('searchKeyword', val => {
        this.keyword = val
      })
    },
    computed: {
      ...mapState(['config', 'searchKeyword', 'searchState'])
    },
    methods: {
      ...mapActions(['search', 'updateSearchKeyword', 'searchReset']),
      handleSearch(keyword) {
        clearTimeout(this.debouncedURLChange)

        if (keyword !== this.$route.query.keyword) {
          // update the url if there wasn't a new search in the last 700ms
          this.debouncedURLChange = setTimeout(() => {
            this.$router.push({ query: { ...this.$route.query, keyword } })
          }, 700)
        }

        this.search(keyword)
      },
      toggleFocus() {
        this.focus = !this.focus
      },
      handleClear() {
        this.searchReset()
        this.keyword = ''
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
      right: 0;
      color: rgba(0,0,0,.22);
      svg {
        width: 14px;
        height: 14px;
      }
      &.close:hover {
        color: #f66;
      }
      &.do-search:hover {
        color: #42b983;
      }
    }
  }
  .search-box {
    height: 100%;
    border: none;
    width: 100%;
    outline: none;
    font-size: 14px;
    padding-right: 45px;
  }
</style>
