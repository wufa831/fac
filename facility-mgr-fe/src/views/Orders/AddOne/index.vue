<template>
  <div>
    <a-modal
      title="添加工单"
      :visible="props.show"
      @ok="submit"
      @cancel="close"
    >

    <a-form :label-col="{span:6}" :wrapper-col="{span:16}">
      <a-form-item label="订单编号">
        <a-input v-model:value="addForm.no" />
      </a-form-item>
      <a-form-item label="客户名称">
        <a-input v-model:value="addForm.custom" />
      </a-form-item>
      <a-form-item label="订单总数">
        <a-input v-model:value="addForm.sum" />
      </a-form-item>
      <a-form-item label="订单类型">
        <a-select
          v-model:value="addForm.kind"
          style="width: 120px"
        >
          <a-select-option value="0">CRM订单</a-select-option>
          <a-select-option value="1">自建</a-select-option>
        </a-select>
      </a-form-item>
   
    </a-form>
    </a-modal>
  </div>
</template>

<script src="./index.js"></script>