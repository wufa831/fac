import { defineComponent,reactive,ref } from 'vue';
import { warning } from '@/service';
import { message } from 'ant-design-vue';
import { result,clone } from '@/helpers/utils';
const defaultFormdata = {
  vendor:'',
  // IMEI号
  IMEI:'',
  //ICCID串号
  ICCID:'',
  //SN号
  SN:'',
  //客户名称
  custom:'',
  //设备状态
  warntype:'',
  //场景属性
  todo:'',
  //安装行政区
  area:'',
};
export default defineComponent({

  props: {
    show:Boolean,
  },

  setup(props,context) {//在组件初始化时执行
    const arealist = ref(['黄浦区局','徐汇区局','长宁区局','静安区局','普陀区局','虹口区局','杨浦区局','闵行区局','宝山区局','嘉定区局','金山区局','松江区局','青浦区局','奉贤区局','崇明区局','浦东新区区局']);
    const addForm = reactive(clone(defaultFormdata));//生拷贝防止reactive对数据产生影响
    
    const submit = async () => {
      const form = clone(addForm);//复制出一个新表单
      // form.activeTime = addForm.activeTime.valueOf();  //激活时间改成时间戳的形式
      const res = await warning.add(form);

      result(res)
        .success((d,{data}) => {
          Object.assign(addForm, defaultFormdata);//成功就合并表单，做到清空表单
          message.success(data.msg);
         
          close();
          context.emit('getList');
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
      arealist,
     
    };
  },
});