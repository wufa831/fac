import { isAdmin } from '@/helpers/character';

export const regDirectives = (app) => {
  app.directive('only-admin', {
    mounted(el, { value = true }) {//判断用户是不是管理员
      
      const res = isAdmin();
      
      if (!res&&value) {
        el.style.display = 'none';
      }
      //el真实dom节点,第二个参数binding是自定义指令双引号中传递的东西

    },
  });
};