 <template>
  <div>
    <a-modal
      title="修改信息"
      :visible="props.show"
      @ok="submit"
      @cancel="close"
    >
 <!-- :visible="props.show" -->
    <a-form :label-col="{span:6}" :wrapper-col="{span:16}">
      <a-form-item label="设备厂商">
        <a-input v-model:value="editForm.vendor" />
      </a-form-item>
      <a-form-item label="IMEI">
        <a-input v-model:value="editForm.IMEI" />
      </a-form-item>
      <a-form-item label="ICCID">
        <a-input v-model:value="editForm.ICCID" />
      </a-form-item>
      <a-form-item label="SN">
        <a-input v-model:value="editForm.SN" />
      </a-form-item>
      <a-form-item label="客户名称">
        <a-input v-model:value="editForm.custom" />
      </a-form-item>
      <a-form-item label="设备状态">
        <a-input v-model:value="editForm.state" />
      </a-form-item>
      <a-form-item label="场景属性">
        <a-input v-model:value="editForm.scene" />
      </a-form-item>
      <a-form-item label="安装行政区">
        <a-input v-model:value="editForm.area" />
      </a-form-item>
      <a-form-item  label="激活时间">
        <!-- <a-space direction="vertical"> -->
         <a-date-picker  v-model:value="editForm.activeTime" />
        <!-- </a-space> -->
      </a-form-item>
    </a-form>
    </a-modal>
  </div>
</template>

<script src="./index.js"></script>