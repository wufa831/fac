import { defineComponent,reactive } from 'vue';
import { facility } from '@/service';
import { message } from 'ant-design-vue';
import { result,clone } from '@/helpers/utils';
const defaultFormdata = {
  vendor: '',
  // IMEI号
  IMEI: '',
  //ICCID串号
  ICCID: '',
  //SN号
  SN: '',
  //客户名称
  custom: '',
  //设备状态
  state: '',
  //场景属性
  scene: '',
  //安装行政区
  area: '',
  //激活时间
  activeTime: 0,
};
export default defineComponent({

  props: {
    show:Boolean,
  },

  setup(props,context) {//在组件初始化时执行

    const addForm = reactive(clone(defaultFormdata));//生拷贝防止reactive对数据产生影响

    const submit = async () => {
      const form = clone(addForm);//复制出一个新表单
      form.activeTime = addForm.activeTime.valueOf();  //激活时间改成时间戳的形式
      const res = await facility.add(form);

      result(res)
        .success((d,{data}) => {
          Object.assign(addForm, defaultFormdata);//成功就合并表单，做到清空表单
          message.success(data.msg);
          close();
        });
    };

    const close = () => {
      context.emit('update:show', false);//emit用来触发自定义事件]
      //v-model双向绑定show的值 update更新show的值为false
    };

    return {
      addForm,
      submit,
      props,
      close,
    };
  },
});