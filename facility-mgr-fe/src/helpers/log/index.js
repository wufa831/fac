export const LOG_MAP = [
  ['/character', '角色操作'],
  ['/log', '日志操作'],
  ['/user/info', '自己的登录信息'],
  ['/facility', '设备操作'],
  ['/state', '场景操作'],
  ['/vendor', '供应商操作'],
  ['/user', '用户操作'],
  ['/order', '订单操作'],
  ['/invite', '邀请码操作'],
  ['/auth/login', '登录'],
  ['/auth/register', '注册'],
  ['/profile/update/password', '修改密码'],
  ['/forget-password/list', '重置密码管理'],
  ['/warning', '预警操作'],

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
