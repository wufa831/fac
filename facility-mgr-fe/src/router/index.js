import { createRouter, createWebHashHistory } from 'vue-router';

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
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
