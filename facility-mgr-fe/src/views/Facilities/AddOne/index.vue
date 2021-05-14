<template>
  <div>
    <a-modal
      title="添加设备"
      :visible="props.show"
      @ok="submit"
      @cancel="close"
    >

    <a-form :label-col="{span:6}" :wrapper-col="{span:16}">
      <a-form-item label="设备厂商">
        <a-select
          v-model:value="addForm.vendor"
          style="width: 120px"
        >
          <a-select-option 
            v-for="item in vendorlist"
            :key="item"
            :value="item"

          >{{item}}</a-select-option>

        </a-select>
      </a-form-item>
      <a-form-item label="IMEI">
        <a-input v-model:value="addForm.IMEI" />
      </a-form-item>
      <a-form-item label="ICCID">
        <a-input v-model:value="addForm.ICCID" />
      </a-form-item>
      <a-form-item label="SN">
        <a-input v-model:value="addForm.SN" />
      </a-form-item>
      <a-form-item label="客户名称">
        <a-input v-model:value="addForm.custom" />
      </a-form-item>
      <a-form-item label="设备状态">
        <a-input v-model:value="addForm.state" />
        <a-select
          v-model:value="addForm.state"
          style="width: 120px"
        >
          <a-select-option 
            v-for="item in activelist"
            :key="item"
            :value="item"

          >{{item}}</a-select-option>

        </a-select>
      </a-form-item>
      <a-form-item label="场景属性">
        <a-select
          v-model:value="addForm.scene"
          style="width: 120px"
        >
          <a-select-option 
            v-for="item in statelist"
            :key="item"
            :value="item"

          >{{item}}</a-select-option>

        </a-select>
      </a-form-item>
      <a-form-item label="安装区局">
        <a-select
          v-model:value="addForm.area"
          style="width: 120px"
        >
          <a-select-option 
            v-for="item in arealist"
            :key="item"
            :value="item"

          >{{item}}</a-select-option>

        </a-select>
      </a-form-item>
      <a-form-item  label="激活时间">
        <!-- <a-space direction="vertical"> -->
         <a-date-picker  v-model:value="addForm.activeTime" />
        <!-- </a-space> -->
      </a-form-item>
    </a-form>
    </a-modal>
  </div>
</template>

<script src="./index.js"></script>