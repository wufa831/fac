export default [
  {
    title: '总览',
    url: '/dashboard',
    onlyAdmin: false,
  },
  {
    title: '设备管理',
    url: '/facilities',
    onlyAdmin:false,
  },
  {
    title: '用户管理',
    url: '/user',
    onlyAdmin:true,
  },
  {
    title: '订单管理',
    url: '/order',
    onlyAdmin:false,
  },
  {
    title: '场景管理',
    url: '/state',
    onlyAdmin:false,
  },
  {
    title: '供应商管理',
    url: '/vendor',
    onlyAdmin:false,
  },
  {
    title: '日志列表',
    url: '/log',
    onlyAdmin:true,
  },
  {
    title: '账户相关',
    onlyAdmin: true,
    children: [
      {
        title: '重置密码列表',
        url: '/reset/password',
        onlyAdmin:true,
      },
      {
        title: '邀请码列表',
        url: '/invite-code',
        onlyAdmin:true,
      },
    ]
  },
  {
    title: '个人设置',
    url: '/profile',
    onlyAdmin: false,
  },
];