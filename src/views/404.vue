<template>
  <div class="not-found">
    <div class="message" v-if="from">
      <h2>
        Cannot find resource at {{ from.path }}
      </h2>
      <router-link to="/">← Back home</router-link>
    </div>
  </div>
</template>

<script>
  import nprogress from 'nprogress'

  export default {
    name: 'not-found',
    data() {
      return {
        from: null
      }
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.from = from
      })
    },
    mounted() {
      nprogress.done()
    }
  }
</script>

<style scoped>
  .not-found {
    height: 100%;
    background-color: #f0f0f0;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
</style>

<style>
  .message {
    font-size: 30px;
    text-shadow: 0 1px white;
    a {
      color: #42b983;
    }
  }
</style>
