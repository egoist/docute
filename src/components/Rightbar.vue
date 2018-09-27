<template>
  <div class="Rightbar">
    <InjectedComponents position="rightbar" />
  </div>
</template>

<style scoped>
.Rightbar {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9;
  width: 250px;
}
</style>


<style scoped>
@media screen and (max-width: 1300px) {
  .Rightbar {
    display: none;
  }
}
</style>
