<template>
  <div>
    <a-spin :spinning="loading">
    <a-card>
      <h2>操作日志</h2>

      <a-divider/>
      
      <space-between>
       <div class="search">
        <a-input-search
         placeholder="根据场景名称搜索"
         enter-button
         v-model:value="keyword1"
         @search="onSearch"
       />
       <a-input-search
         placeholder="根据场景类型搜索"
         enter-button
         v-model:value="keyword2"
         @search="onSearch"
       />

       <a v-if="isSearch" href="javascript:;" @click="backAll">返回</a>
       </div>
      
       
      </space-between>

      <a-divider/>

       <a-table 
        :columns="columns"
        :data-source="list"
        :pagination="false"
       >
          <template #createdAt="{record}">
            {{formatTimestamp(record.meta.createdAt)}}
          </template>
       </a-table>
       <space-between
        style="margin-top:24px"
       >
         <div/>
         <a-pagination
          v-model:current="curPage" 
          :total="total" 
          :pageSize="20"
          @change="setPage"
         />
       </space-between>
    </a-card>

   </a-spin>
  </div>
</template>

<script src='./index.js'></script>

<style lang="scss" scoped>  //加scoped解决组件之间样式相互影响的问题，给生成的css带上属性选择器，不加所有class相同都会生效
 @import './index.scss';
</style>

