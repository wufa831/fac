 <template>
  <div>
    <a-modal
      title="处理备注"
      :visible="props.show"
      @ok="submit"
      @cancel="close"
    >
     <a-form :label-col="{span:6}" :wrapper-col="{span:16}" >
    {{props.facility.warninglog}}
    <a-form-item label="处理人">
        {{props.facility.user}}
      </a-form-item>
    </a-form>
    </a-modal>
  </div>
</template>

<script src="./index.js"></script>