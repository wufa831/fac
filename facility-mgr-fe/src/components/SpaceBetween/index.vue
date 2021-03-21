<template>  
  <div class="space-between">
    <slot/>  
    <!-- /* //组件在main.js中引入 全局引入后被包裹的内容放在slot插槽中 此为插槽最简单用法 */ -->
  </div>
</template>

<style lang="scss" scoped>

  .space-between{ 
    display: flex;
    justify-content: space-between;
  }
</style>

