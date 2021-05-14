<template>
  <div>
    <a-spin :spinning="loading">
    <a-card>
      <h2>操作日志</h2>

      <a-divider/>
      <space-between>
        <a-row class="row" type="flex">
          <a-col :flex="5">
            <a-input-search
              placeholder="根据用户名搜索"
              enter-button
              v-model:value="keyword1"
              @search="onSearch"
            />
          </a-col>
          <a-col :flex="1"></a-col>
          <a-col :flex="4">
            <a-select
              v-model:value="keyword2"
              style="width: 280px"
              @change="handleChange"
            >
              <a-select-option 
                v-for="item in LOG_MAP"
                :key="item[1]"
                :value="item[0]"


              >{{item[1]}}</a-select-option>

            </a-select>
          </a-col>
          
        </a-row>

       
       
      
       <a v-show="isSearch" href="javascript:;" @click="backAll">返回</a>
       <div class="ban">
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

