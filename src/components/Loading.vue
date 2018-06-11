<template>
  <div class="Loading">Loading...</div>
</template>

<style>
.Loading {
  font-size: 2rem;
  font-weight: 300;
  color: #b1b0b0;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: 1s infinite fade-in-out;
}

@keyframes fade-in-out {
  from {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  to {
    opacity: 1;
  }
}
</style>
