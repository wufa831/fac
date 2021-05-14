import { defineComponent,reactive,watch,ref } from 'vue';
import { warning } from '@/service';
import { message } from 'ant-design-vue';
import { result, clone } from '@/helpers/utils';
import { moment } from 'moment';
import { update } from '../../../service/facility';
import store from '@/store';
export default defineComponent({
    props: {
    show: Boolean,
    facility:Object,
  },
  setup(props, context) {

    const editForm = reactive({
      // IMEI号
      // vendor:'',
      IMEI: '',
      // ICCID: '',
      // SN:'',
      custom:'',
      //设备状态
      warntype:'',
      //场景属性
      todo:'',
      //安装行政区
      area: '',
      
      warninglog:'',
    });
    const arealist = ref(['黄浦区局','徐汇区局','长宁区局','静安区局','普陀区局','虹口区局','杨浦区局','闵行区局','宝山区局','嘉定区局','金山区局','松江区局','青浦区局','奉贤区局','崇明区局','浦东新区区局']);
    const todolist = ref(['未处理', '已处理', '无需处理']);
    const submit = async () => {
      
      const res = await warning.update({
        id: props.facility._id,
        //...editForm,这里不是表示剩余参数，理解为扩展运算符，把内容展开铺平，或理解为合并两个对象
        //date:editForm.date.valueOf(),用来覆盖editform里的date数据 不覆盖前端显示不正确
        IMEI: editForm.IMEI,
        custom: editForm.custom,
        warntype: editForm.warntype,
        todo: editForm.todo,
        area: editForm.area,
        warninglog: editForm.warninglog,
        user:store.state.userInfo.account,
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
      todolist,
      arealist,

    };
  },
});
