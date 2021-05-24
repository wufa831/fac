export default [
  {
    title: '总览',
    url: '/dashboard',
    onlyAdmin: false,
    onlySuperAdmin:false,
  },
  {
    title: '设备管理',
    url: '/facilities',
    onlyAdmin: false,
    onlySuperAdmin:false,
  },
  {
    title: '订单管理',
    url: '/order',
    onlyAdmin: false,
    onlySuperAdmin:false,
  },
  {
    title: '场景管理',
    url: '/state',
    onlyAdmin: false,
    onlySuperAdmin:false,
  },
  {
    title: '供应商管理',
    url: '/vendor',
    onlyAdmin: false,
    onlySuperAdmin:false,
  },
  {
    title: '预警管理',
    onlyAdmin: false,
    onlySuperAdmin:false,
    children: [
      {
        title: '预警处理',
        url: '/warning',
        onlyAdmin: false,
        onlySuperAdmin:false,
      },
      {
        title: '预警统计',
        url: '/warninglog',
        onlyAdmin: false,
        onlySuperAdmin:false,
      },
    ]
  },
  {
    title: '用户管理',
    url: '/user',
    onlyAdmin: true,
    onlySuperAdmin:false,
  },
  {
    title: '日志列表',
    url: '/log',
    onlyAdmin: false,
    onlySuperAdmin:true,
  },
  {
    title: '账户相关',
    onlyAdmin: true,
    onlySuperAdmin:false,
    children: [
      {
        title: '重置密码列表',
        url: '/reset/password',
        onlyAdmin: true,
        onlySuperAdmin:false,
      },
      {
        title: '邀请码列表',
        url: '/invite-code',
        onlyAdmin: true,
        onlySuperAdmin:false,
      },
    ]
  },
  {
    title: '个人设置',
    url: '/profile',
    onlyAdmin: false,
    onlySuperAdmin:false,
  },
];