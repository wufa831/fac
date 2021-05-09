import { defineComponent } from 'vue';
import { setToken } from '@/helpers/token';
import Nav from './Nav/index.vue';
import store from '@/store';

export default defineComponent({
  components: {
    AppNav:Nav,
  },
  setup() {
    const logout = () => {//退出登录的方法
      setToken('');

      window.location.href = '/';//跳到首页
    };

    return {
      logout,
      store: store.state,
    };
  },
});