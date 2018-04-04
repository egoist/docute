<template>
  <div id="docute">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'DocuteRoot'
}
</script>

<style>
@import "prism-tomorrow.css";
@import "nprogress.css";
@import "common.css";
@import "markdown.css";

body {
  font: 16px/1.4 -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;
  margin: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

* {
  box-sizing: border-box;
}
</style>
