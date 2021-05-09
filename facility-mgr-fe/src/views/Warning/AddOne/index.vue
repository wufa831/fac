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
        <a-input v-model:value="addForm.vendor" />
      </a-form-item>
      <a-form-item label="IMEI">
        <a-input v-model:value="addForm.IMEI" />
      </a-form-item>
      <a-form-item label="处理">
        <a-input v-model:value="addForm.todo" />
      </a-form-item>
      
    </a-form>
    </a-modal>
  </div>
</template>

<script src="./index.js"></script>