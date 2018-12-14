<template functional>
  <div class="DocuteSelect">
    <select class="select" v-on="listeners">
      <slot name="default"></slot>
    </select>
    <div class="arrow">
      <svg
        width="13"
        height="6"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke="#979797"
        fill-rule="evenodd"
        stroke-linecap="square"
      >
        <path d="M1.367.375l5.185 5.303M11.685.375L6.5 5.678"></path>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DocuteSelect'
}
</script>

<style scoped>
.DocuteSelect {
  appearance: none;
  color: #fff;
  background: white;
  display: inline-flex;
  height: 40px;
  outline: none;
  border: 1px solid #eaeaea;
  font-size: 12px;
  text-transform: uppercase;
  user-select: none;
  font-weight: 100;
  position: relative;
  overflow: hidden;
  transition: border 0.2s, background 0.2s, color 0.2s ease-out,
    box-shadow 0.2s ease;
  border-radius: 5px;
  white-space: nowrap;
  line-height: 0;
  width: 100%;

  &:hover {
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    border-color: #ddd;

    & .arrow {
      border-color: #ddd;
    }
  }
}

.select {
  appearance: none;
  height: 100%;
  border: none;
  box-shadow: none;
  background: transparent;
  background-image: none;
  line-height: 40px;
  font-size: 14px;
  margin-right: -20px;
  padding: 0 76px 0 16px;
  text-transform: none;
  width: 100%;
  outline: none;
}

.arrow {
  border-left: 1px solid #eaeaea;
  background: white;
  width: 40px;
  height: 100%;
  position: absolute;
  right: 0;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
