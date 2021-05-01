<template>
  <div>
    <a-card>
      <h2>供应商列表</h2>

      <a-divider/>
      
      <space-between>
       <div class="search">
        <a-input-search
         placeholder="根据供应商名称搜索"
         enter-button
         v-model:value="keyword"
         @search="onSearch"
       />

       <a v-if="isSearch" href="javascript:;" @click="backAll">返回</a>
       </div>
      
       <a-button @click="show =true">添加供应商</a-button>
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
         
        <template #actions="record">
           <!-- 这里就得提到一个表格特有的参数了，通过这个参数，我们可以拿到表格每一行的数据，这个参数就是record
            用法：例如，表格行中有一个属性是name，那么，我要拿到这个每一行name的值，我就可以用过record.name来拿到 -->
            <!-- <a href="javascript:;" @click="showedit=true">编辑</a> -->
            <a href="javascript:;" @click="update(record); showedit = true;">编辑</a>
            &nbsp;
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
    <edit-one
      v-model:show="showedit"
      :vendor="curVendor"
      @update="updateCurVendor"
    />
    <!-- @getList="getVendor" -->
  </div>
</template>

<script src='./index.js'>

</script>

<style lang="scss" scoped>  //加scoped解决组件之间样式相互影响的问题，给生成的css带上属性选择器，不加所有class相同都会生效
 @import './index.scss';
</style>

