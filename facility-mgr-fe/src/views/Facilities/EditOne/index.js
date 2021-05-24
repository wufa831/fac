import { defineComponent,reactive,watch,ref } from 'vue';
import { facility } from '@/service';
import { message } from 'ant-design-vue';
import { result, clone } from '@/helpers/utils';
import { moment } from 'moment';
import { update } from '../../../service/facility';
export default defineComponent({
    props: {
    show: Boolean,
    facility: Object,
    statelist: Array,
    vendorlist: Array,
  },
  setup(props, context) {
    const arealist = ref(['黄浦区局','徐汇区局','长宁区局','静安区局','普陀区局','虹口区局','杨浦区局','闵行区局','宝山区局','嘉定区局','金山区局','松江区局','青浦区局','奉贤区局','崇明区局','浦东新区区局']);
    const activelist = ref(['激活', '未激活', '弃用']);
    const editForm = reactive({
      vendor: '',
      IMEI: '',
      ICCID: '',
      SN: '',
      custom: '',
      state: '',
      scene: '',
      area: '',
      activeTime: 0,
    });
    const submit = async () => {
      const res = await facility.update({
        id: props.facility._id,
        //...editForm,这里不是表示剩余参数，理解为扩展运算符，把内容展开铺平，或理解为合并两个对象
        //date:editForm.date.valueOf(),用来覆盖editform里的date数据 不覆盖前端显示不正确
      
        vendor: editForm.vendor,
        IMEI: editForm.IMEI,
        ICCID: editForm.ICCID,
        SN:editForm.SN,
        custom: editForm.custom,
        state: editForm.state,
        scene: editForm.scene,
        area: editForm.area,
        activeTime: editForm.activeTime.valueOf(),
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
      arealist,
      activelist,

    };
  },
});
