import { createRouter, createWebHashHistory } from 'vue-router';
import store from '@/store';


const routes = [
  {
    path: '/auth',
    name: 'Auth',
    component: () => import(/* webpackChunkName: "auth" */ '../views/Auth/index.vue'),
  },
  {
    path: '/',
    name: 'BasicLayout',
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
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});


router.beforeEach(async (to, from, next) => {
  const reqArr = [];

  if (!store.state.characterInfo.length) {
   
    reqArr.push(store.dispatch('getCharacterInfo'));//store.dispatch触发actions
  }

  if (!store.state.userInfo.account) {
   
    reqArr.push(store.dispatch('getUserInfo'));//store.dispatch触发actions
  }

  await Promise.all(reqArr);//接收数组里的promise为reserve是进入.then
  //所有请求都响应后在做接下来的事情

  next();
});


export default router;
