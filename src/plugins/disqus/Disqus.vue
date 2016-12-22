<template>
  <div id="disqus_thread"></div>
</template>

<script>
  export default {
    props: {
      shortname: {
        type: String,
        required: true
      }
    },
    mounted() {
      if (!window.DISQUS) {
        this.init()
      } else {
        this.reset()
      }
    },
    methods: {
      init() {
        const vm = this
        window.disqus_config = function () {
          this.page.url = location.origin + vm.$route.path
          this.page.identifier = vm.$route.path
        }

        const script = document.createElement('script')
        script.async = true
        script.type = 'text/javascript'
        script.setAttribute('data-timestamp', +new Date())
        script.src = `//${this.shortname}.disqus.com/embed.js`
        document.body.appendChild(script)
      },
      reset() {
        const vm = this
        window.DISQUS.reset({
          reload: true,
          config() {
            this.page.identifier = vm.$route.path
            this.page.url = location.origin + vm.$route.path
          }
        })
      }
    }
  }
</script>
