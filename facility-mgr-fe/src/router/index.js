import { createRouter, createWebHashHistory } from 'vue-router';
import store from '@/store';
import { message } from 'ant-design-vue';
import { user } from '@/service';


const routes = [
  {
    path: '/auth',
    name: 'Auth',
    component: () => import(/* webpackChunkName: "auth" */ '../views/Auth/index.vue'),
  },
  {
    path: '/',
    name: 'BasicLayout',
    redirect:'/auth',
    component: () => import(/* webpackChunkName: "BasicLayout " */ '../layout/BasicLayout/index.vue'),
    children: [//router-view子路由 渲染到BasicLayout
      {
        path: 'facilities',
        name: 'Facilities',
        component: () => import(/* webpackChunkName: "Facilities" */ '../views/Facilities/index.vue'),
      },
      {
        path: 'user',
        name: 'User',
        component: () => import(/* webpackChunkName: "User" */ '../views/Users/index.vue'),
      },
      {
        path: 'vendor',
        name: 'Vendor',
        component: () => import(/* webpackChunkName: "Vendor" */ '../views/Vendors/index.vue'),
      },
      {
        path: 'order',
        name: 'Order',
        component: () => import(/* webpackChunkName: "Order" */ '../views/Orders/index.vue'),
      },
      {
        path: 'state',
        name: 'State',
        component: () => import(/* webpackChunkName: "State" */ '../views/States/index.vue'),
      },
      {
        path: 'log',
        name: 'Log',
        component: () => import(/* webpackChunkName: "Log" */ '../views/Log/index.vue'),
      },
      {
        path: 'reset/password',
        name: 'ResetPassword',
        component: () => import(/* webpackChunkName: "ResetPassword" */ '../views/ResetPassword/index.vue'),
      },
      {
        path: 'invite-code',
        name: 'InviteCode',
        component: () => import(/* webpackChunkName: "InviteCode" */ '../views/InviteCode/index.vue'),
      },
      {
        path: 'profile',
        name: 'Profile',
        component: () => import(/* webpackChunkName: "Profile" */ '../views/Profile/index.vue'),
      },
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import(/* webpackChunkName: "Dashboard" */ '../views/Dashboard/index.vue'),
      },
      {
        path: 'warning',
        name: 'Warning',
        component: () => import(/* webpackChunkName: "Warning" */ '../views/Warning/index.vue'),
      },
      {
        path: 'warninglog',
        name: 'Warninglog',
        component: () => import(/* webpackChunkName: "Warninglog" */ '../views/Warninglog/index.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});


router.beforeEach(async (to, from, next) => {
  `
  清除token后页面会白屏：进入页面之前会先获取角色信息，不在登录状态下去取会401，不做处理会中断不做next
  `
  

  let res = {};

  try {
    res = await user.info();//获取信息 如果报错是401则取到res code
  } catch (e) {
    if (e.message.includes('code 401')) {
      res.code = 401;
    }
  }

  const { code } = res;

  if (code === 401) {
    if (to.path === '/auth') {
      next();
      return;
    }
    message.error('认证失败，请重新登陆');
    next('/auth');
    return;
  }


  

  if (!store.state.characterInfo.length) {
   
    await store.dispatch('getCharacterInfo');//store.dispatch触发actions
  }

  if (!store.state.userInfo.account) {
   
    await store.dispatch('getUserInfo');//store.dispatch触发actions
  }

  // await Promise.all(reqArr);//接收数组里的promise为reserve是进入.then
  //所有请求都响应后在做接下来的事情

  next();
});


export default router;
