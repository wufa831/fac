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
        path: '/facilities',
        name: 'Facilities',
        component: () => import(/* webpackChunkName: "Facilities" */ '../views/Facilities/index.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
