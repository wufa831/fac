<template>
  <div>
    <a-card>
      <h2>设备列表</h2>

      <a-divider/>
      
      <space-between>
       <div class="search">
        <a-input-search
         placeholder="根据设备号搜索"
         enter-button
       />
       </div>
      
       <a-button>添加一条</a-button>
      </space-between>

      <a-divider/>

       <a-table :columns="columns" :data-source="dataSourse">
 
       </a-table>

    </a-card>
  </div>
</template>

<script src='./index.js'></script>

<style lang="scss" scoped>  //加scoped解决组件之间样式相互影响的问题，给生成的css带上属性选择器，不加所有class相同都会生效
 @import './index.scss';
</style>

