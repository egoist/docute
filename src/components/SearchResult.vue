<template>
  <div class="search-result">
    <div class="empty-search-result inner-x" v-if="!searching && searchResult.length === 0">
      No search results :(
    </div>
    <div
      class="inner-x result-item"
      :class="{active: isActive(item)}"
      v-for="item in searchResult"
      @click="handleClick(item)">
      <span class="result-title" v-html="item.title"></span>
      <div class="result-content" v-html="item.content" v-if="item.content"></div>
    </div>
  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex'

  export default {
    computed: {
      ...mapState(['searching', 'pluginSearch']),
      ...mapState({
        searchResult: state => state.searchResult.filter(item => {
          return Boolean(item.title) || Boolean(item.content)
        })
      })
    },
    methods: {
      ...mapActions(['jumpToId']),
      handleClick({path, id}) {
        if (path === this.$route.path) this.jumpToId(id)
        this.$router.push({path, query: {...this.$route.query, id}})
      },
      isActive(item) {
        return item.path === this.$route.path && item.id === this.$route.query.id
      }
    }
  }
</script>

<style>
  .search-result {
    .result-item {
      cursor: pointer;
      padding-top: 20px;
      padding-bottom: 20px;
      border-bottom: 1px solid rgba(0,0,0,.07);
      &:last-child {
        margin-bottom: 20px;
      }
      &:hover {
        background-color: #f9f9f9;
      }
      &.active {
        border-left: 3px solid #42b983;
      }
      .result-title {
        color: #42b983;
      }
      .result-content {
        margin-top: 5px;
        color: #666;
      }
    }
    .empty-search-result {
      padding-top: 10px;
      color: #666;
    }
  }
</style>
