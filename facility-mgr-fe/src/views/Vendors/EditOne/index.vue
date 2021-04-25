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
      <a-form-item label="厂商名称">
        <a-input v-model:value="addForm.vendorname" />
      </a-form-item>
      <a-form-item label="供应商编号">
        <a-input v-model:value="addForm.no" />
      </a-form-item>
      <a-form-item label="联系人">
        <a-input v-model:value="addForm.contact" />
      </a-form-item>
      <a-form-item label="联系方式">
        <a-input v-model:value="addForm.tel" />
      </a-form-item>
      <a-form-item label="地址">
        <a-input v-model:value="addForm.address" />
      </a-form-item>

    </a-form>
    </a-modal>
  </div>
</template>

<script src="./index.js"></script>