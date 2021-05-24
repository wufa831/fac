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
        <a-select
          v-model:value="editForm.vendor"
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
        <a-select
          v-model:value="editForm.state"
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
          v-model:value="editForm.scene"
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
          v-model:value="editForm.area"
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
         <a-date-picker  v-model:value="editForm.activeTime" />
        <!-- </a-space> -->
      </a-form-item>
    </a-form>
    </a-modal>
  </div>
</template>

<script src="./index.js"></script>