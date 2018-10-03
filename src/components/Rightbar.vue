<template>
  <div class="Rightbar">
    <InjectedComponents position="rightbar" />
  </div>
</template>

<style scoped>
@import 'vars.css';

.Rightbar {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9;
  width: var(--sidebar-width);
}
</style>


<style scoped>
@media screen and (max-width: 1300px) {
  .Rightbar {
    display: none;
  }
}
</style>
