import { defineComponent,reactive } from 'vue';
import { user } from '@/service';
import { message } from 'ant-design-vue';
import { result,clone } from '@/helpers/utils';
const defaultFormdata = {
  account: '',
  password:'',


};
export default defineComponent({

  props: {
    show:Boolean,
  },

  setup(props,context) {//在组件初始化时执行
    console.log(props);
    const addForm = reactive(clone(defaultFormdata));//生拷贝防止reactive对数据产生影响

    const close = () => {
      context.emit('update:show', false);//emit用来触发自定义事件]
      //v-model双向绑定show的值 update更新show的值为false
    };

    const submit = async () => {
      const form = clone(addForm);//复制出一个新表单

      const res = await user.add(form.account,form.password);

      result(res)
        .success((d,{data}) => {
          Object.assign(addForm, defaultFormdata);//成功就合并表单，做到清空表单
          message.success(data.msg);

          close();
          context.emit('getList');
        });
    };

    

    return {
      addForm,
      submit,
      props,
      close,
    };
  },
});