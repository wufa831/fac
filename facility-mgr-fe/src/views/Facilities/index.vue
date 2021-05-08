<template>
  <div>
    <a-card>
      <h2>设备列表</h2>

      <a-divider/>
      
      <space-between>
       <div class="search">
        <a-input-search
         placeholder="根据设备厂商搜索"
         enter-button
         v-model:value="keyword1"
         @search="onSearch"
       />
       <a-input-search
         placeholder="根据IMEI号搜索"
         enter-button
         v-model:value="keyword2"
         @search="onSearch"
       />

       <a v-if="isSearch" href="javascript:;" @click="backAll">返回</a>
       </div>
      
      <div>
        <a-button 
          @click="show =true"
          :loading="loading"
        >
        添加设备
        </a-button>
        &nbsp;
        <a-upload
            @change="onUploadChange"
            action="http://localhost:3000/upload/file"

        >
          <!-- :headers="headers" -->
            <a-button type="primary">上传 Excel 添加</a-button>
          </a-upload>
      </div>
      </space-between>

      <a-divider/>

       <a-table 
        :columns="columns"
        :data-source="list"
        :pagination="false"
       >
         <template #activeTime="record">
           <!-- 插槽的一种写法 -->
            {{formatTimestamp(record.record.activeTime)}}
         </template>
         <template #actions="record">
           <!-- 这里就得提到一个表格特有的参数了，通过这个参数，我们可以拿到表格每一行的数据，这个参数就是record
            用法：例如，表格行中有一个属性是name，那么，我要拿到这个每一行name的值，我就可以用过record.name来拿到 -->
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
      @getList="getList"
      :statelist="list2"
    />
    <edit-one
      v-model:show="showedit"
      :facility="curFacility"
      @update="updatecurFacility"
      :statelist="list2"
    />
  </div>
</template>

<script src='./index.js'></script>

<style lang="scss" scoped>  //加scoped解决组件之间样式相互影响的问题，给生成的css带上属性选择器，不加所有class相同都会生效
 @import './index.scss';
</style>

