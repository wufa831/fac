import { defineComponent,reactive,ref } from 'vue';
import {UserOutlined,LockOutlined,MailOutlined,} from '@ant-design/icons-vue';
import { auth,resetPassword} from '@/service';
import { result } from '@/helpers/utils';
import { message, Modal, Input } from 'ant-design-vue';
import store from '@/store';
import { getCharacterInfoById } from '@/helpers/character';
import { useRouter } from 'vue-router';
import { setToken } from '@/helpers/token';

// auth.register
export default defineComponent({
  components: {
    UserOutlined,
    LockOutlined,
    MailOutlined,
  },

  setup() {

    const router = useRouter();
    //注册用表单数据
    const regForm = reactive({ //声明多个响应式数据值，创建一组数据
      account: '',
      password: '',
      inviteCode:'',
    });

    const forgetPassword = () => {
      Modal.confirm({
        title: `输入账号发起申请`,
        content: (
          <div>
            <Input class="__forget_password_account" />
          </div>
        ),
        onOk: async () => {
          const el = document.querySelector('.__forget_password_account');
          let account = el.value;

          const res = await resetPassword.add(account);

          result(res)
            .success(({ msg }) => {
              message.success(msg);
            });
        },
      });
    };

    //注册逻辑
    const register = async() => {//注册方法，调用auth.register发送html请求 返回promise，带两个数据//axios
      if (regForm.account === '') {
        message.info('请输入账户');
        return;
      }
      if (regForm.password === '') {
        message.info('请输入密码');
        return;
      }
      if (regForm.inviteCode === '') {
        message.info('请输入邀请码');
        return;
      }

      const res = await auth.register(
        regForm.account,
        regForm.password,
        regForm.inviteCode,
      );//解构方式拿到res.data
      
      result(res)
        .success((data) => {
          message.success(data.msg);
        });
      // if (data.code) {//0失败1成功
      //   message.success(data.msg);//data.msg由服务端提供
      //   return;
      // }
      // message.error(data.msg);
      
    };

    //登入用表单数据
    const loginForm = reactive({ //声明多个响应式数据值，创建一组数据
      account: '',
      password: '',
    });

    //登入逻辑
    const login =async () => {
      if (loginForm.account === '') {
        message.info('请输入账户');
        return;
      }
      if (loginForm.password === '') {
        message.info('请输入密码');
        return;
      }


      const res= await auth.login(loginForm.account, loginForm.password);//解构方式拿到res.data
      result(res)
        .success(({msg,data:{user,token}}) => {
          message.success(msg);


          store.commit('setUserInfo', user);
          
          store.commit('setUserCharacter', getCharacterInfoById(user.character));

          setToken(token);

          router.replace('/facilities');
        });
    };

    return {//作为setup返回值返回，然后可以在模板index.vue中使用
      regForm,//注册相关
      register,

      login,//登入相关
      loginForm,

      forgetPassword,
    };
  },
});