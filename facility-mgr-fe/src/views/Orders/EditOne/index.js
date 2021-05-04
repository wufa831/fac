import { defineComponent,reactive,watch } from 'vue';
import { order } from '@/service';
import { message } from 'ant-design-vue';
import { result, clone } from '@/helpers/utils';
import { moment } from 'moment';
import { update } from '../../../service/facility';
export default defineComponent({
    props: {
    show: Boolean,
    facility:Object,
  },
  setup(props, context) {

    const editForm = reactive({
      no: '',
      custom: '',
      sum: '',
      kind:'',
    });
    const submit = async () => {
      const res = await order.update({
        id: props.facility._id,
        //...editForm,这里不是表示剩余参数，理解为扩展运算符，把内容展开铺平，或理解为合并两个对象
        //date:editForm.date.valueOf(),用来覆盖editform里的date数据 不覆盖前端显示不正确
        no: editForm.no,
        custom: editForm.custom,
        sum: editForm.sum,
        kind:editForm.kind,
      });

      result(res)
        .success(({data,msg}) => {
          context.emit('update', data);
          message.success(msg);
          close();
        });
    };
      
    const close = () => {
      context.emit('update:show', false);//emit用来触发自定义事件]
      //v-model双向绑定show的值 update更新show的值为false
    };

    watch(() => props.facility, (current) => {//监听响应式数据的变化，current危改变后的数据，然后将两个表合并
      Object.assign(editForm, current);
      // editForm.activeTime = moment(Number(editForm.activeTime));
    });


    return {
      editForm,
      submit,
      props,
      close,

    };
  },
});
