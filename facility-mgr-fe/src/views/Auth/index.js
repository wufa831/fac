import { defineComponent,reactive,ref } from 'vue';
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
} from '@ant-design/icons-vue';

import { auth } from '@/service';

// auth.register
export default defineComponent({
  components: {
    UserOutlined,
    LockOutlined,
    MailOutlined,
  },

  setup() {

    const regForm = reactive({ //声明多个响应式数据值，创建一组数据
      account: '',
      password: '',
    });

    const register = () => {//注册方法，调用auth.register发送html请求，带两个数据
      auth.register(regForm.account, regForm.password);
      // console.log(regForm);
    };

    return {//作为setup返回值返回，然后可以在模板index.vue中使用
      regForm,

      register,
    };
  },
});