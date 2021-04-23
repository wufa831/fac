import { defineComponent,reactive } from 'vue';
import { vendor } from '@/service';
import { message } from 'ant-design-vue';
import { result, clone } from '@/helpers/utils';

const defaultFormdata = {
  vendorname: '',
  no: '',
  contact: '',
  tel: '',
  address: '',
};
export default defineComponent({
    props: {
    show:Boolean,
  },
  setup(props,context) {

    const addForm = reactive(clone(defaultFormdata));
    const submit = async () => {
      const form = clone(addForm);//复制出一个新表单
      const res = await vendor.add(form);
      
      result(res)
       .success((d,{data}) => {
         Object.assign(addForm, defaultFormdata);//成功就合并表单，做到清空表单
         message.success(data.msg);
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
// const defaultFormdata = {
//   vendorname: '',
//   no: '',
//   contact: '',
//   tel: '',
//   address: '',
// };
// export default defineComponent({

//   props: {
//     show:Boolean,
//   },

//   setup(props,context) {//在组件初始化时执行
//     console.log(props);
//     const addForm = reactive(clone(defaultFormdata));//生拷贝防止reactive对数据产生影响

//     const submit = async () => {
//       const form = clone(addForm);//复制出一个新表单
      
//       const res = await vendor.add(form);

//       result(res)
//         .success((d,{data}) => {
//           Object.assign(addForm, defaultFormdata);//成功就合并表单，做到清空表单
//           message.success(data.msg);
//         });
//     };

//     const close = () => {
//       context.emit('update:show', false);//emit用来触发自定义事件]
//       //v-model双向绑定show的值 update更新show的值为false
//     };

//     return {
//       addForm,
//       submit,
//       props,
//       close,
//     };
//   },
// });