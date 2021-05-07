const LOG_MAP = [
  ['/character/list', '获取角色列表'],
  ['/log/list', '获取日志列表'],
  ['/user/info', '获取自己的登入信息'],
  ['/facility/list', '获取设备列表'],
  ['/state/list', '获取场景列表'],
  ['/vendor/list', '获取供应商列表'],
  ['/user/list', '获取用户列表'],
  ['/order/list', '获取订单列表'],
  ['/invite/list', '获取邀请码列表'],
  ['/auth/login', '登录'],
  ['/auth/register', '注册'],
  ['/profile/update/password', '修改密码'],
  ['/forget-password/list', '获取重置密码列表'],

];

export const getLogInfoByPath = (path) => {//对path做判断 在logmap里做返回
  let title = '';

  LOG_MAP.forEach((item) => {
    if (path.includes(item[0])) {//includes找到返回true 否则false
      title = path.replace(item[0], item[1]);
    }
  });

  return title || path;
};
