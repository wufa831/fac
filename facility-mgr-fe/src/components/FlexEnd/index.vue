<template>  
  <div class="flex-end">
    <slot/>  
    <!-- /* //组件在main.js中引入 全局引入后被包裹的内容放在slot插槽中 此为插槽最简单用法 */ -->
  </div>
</template>

<style lang="scss" scoped>
  .flex-end{ 
    display: flex;
    justify-content: flex-end;
  }
</style>

