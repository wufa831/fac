 <template>
  <div>
    <a-modal
      title="处理预警"
      :visible="props.show"
      @ok="submit"
      @cancel="close"
    >
 <!-- :visible="props.show" -->
     <a-form :label-col="{span:6}" :wrapper-col="{span:16}" >
      <a-form-item label="IMEI号">
        {{editForm.IMEI}}
      </a-form-item>
      <a-form-item label="客户名称">
        {{editForm.custom}}
      </a-form-item>
      <a-form-item label="预警类型">
        <a-input style="width: 300px" v-model:value="editForm.warntype" />
      </a-form-item>
      <a-form-item label="区局">
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
      <a-form-item label="处理状态">
        <a-select
          v-model:value="editForm.todo"
          style="width: 120px"
        >
          <a-select-option 
            v-for="item in todolist"
            :key="item"
            :value="item"

          >{{item}}</a-select-option>
        </a-select>
      
      </a-form-item>
      <a-form-item label="处理备注">
        <a-input style="width: 300px;height:150px;" v-model:value="editForm.warninglog" />
      </a-form-item>
   
    </a-form>
    </a-modal>
  </div>
</template>

<script src="./index.js"></script>