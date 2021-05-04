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
      <a-form-item label="场景名称">
        <a-input v-model:value="editForm.statename" />
      </a-form-item>
      <a-form-item label="场景类型">
        <a-select
          v-model:value="editForm.statetype"
          style="width: 120px"
        >
          <a-select-option value="0">独居老人</a-select-option>
          <a-select-option value="1">常规监控</a-select-option>
          <a-select-option value="2">常开门</a-select-option>
          <a-select-option value="3">常闭门</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="是否布防">
        <a-select
          v-model:value="editForm.isuse"
          style="width: 120px"
        >
          <a-select-option value="0">是</a-select-option>
          <a-select-option value="1">否</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="门开时长（秒）">
        <a-input v-model:value="editForm.actiontime" />
      </a-form-item>
      <a-form-item label="电量预警（%）">
        <a-input v-model:value="editForm.power" />
      </a-form-item>
      
    </a-form>
    </a-modal>
  </div>
</template>

<script src="./index.js"></script>