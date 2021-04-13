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
         v-model:value="keyword"
         @search="onSearch"
       />

       <a v-if="isSearch" href="javascript:;" @click="backAll">返回</a>
       </div>
      
       <a-button @click="show =true">添加一条</a-button>
      </space-between>

      <a-divider/>

       <a-table 
        :columns="columns"
        :data-source="list"
        :pagination="false"
       >
         <template #activeTime="data">
            {{formatTimestamp(data.record.activeTime)}}
         </template>
         <template #actions="record">
            <a href="javascript:;" @click="remove(record)">删除</a>
         </template>
       </a-table>
       <space-between
        style="margin-top:24px"
       >
         <div/>
         <a-pagination
          v-model:current="curPage" 
          :total="total" 
          :pageSize="10"
          @change="setPage"
         />
       </space-between>
    </a-card>

    <add-one
      v-model:show="show"
    />
  </div>
</template>

<script src='./index.js'></script>

<style lang="scss" scoped>  //加scoped解决组件之间样式相互影响的问题，给生成的css带上属性选择器，不加所有class相同都会生效
 @import './index.scss';
</style>

