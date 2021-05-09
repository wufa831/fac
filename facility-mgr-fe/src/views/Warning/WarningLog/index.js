import { defineComponent,reactive,watch,ref } from 'vue';
import { warning } from '@/service';
import { message } from 'ant-design-vue';
import { result, clone } from '@/helpers/utils';
export default defineComponent({
    props: {
    show: Boolean,
    facility:Object,
  },
  setup(props, context) {

    const submit = async () => {
      close();
    };
      
    const close = () => {
      context.emit('update:show', false);//emit用来触发自定义事件]
      //v-model双向绑定show的值 update更新show的值为false
    };

    return {
      submit,
      props,
      close,
    };
  },
});
