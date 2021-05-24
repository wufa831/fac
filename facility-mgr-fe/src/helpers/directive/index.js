import { isAdmin,isSuperAdmin } from '@/helpers/character';

export const regDirectives = (app) => {
  app.directive('only-admin', {
    mounted(el, { value = true }) {//判断用户是不是管理员
      
      const res1 = isAdmin();
      const res2 = isSuperAdmin();//false,value=true,res=false
      
      if ((!res1&&!res2)&&value) {
        el.style.display = 'none';
      }
      //el真实dom节点,第二个参数binding是自定义指令双引号中传递的东西

    },
  });
};

export const regSuper = (app) => {
  app.directive('only-super-admin', {
    mounted(el, { value = true }) {//判断用户是不是管理员
      
      const res = isSuperAdmin();

      if (!res&&value) {
        el.style.display = 'none';
      }
      //el真实dom节点,第二个参数binding是自定义指令双引号中传递的东西

    },
  });
  
};