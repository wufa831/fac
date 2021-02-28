const auth = require('./auth/index');
const inviteCode = require('./invite-code');

module.exports = (app) => {
  app.use(auth.routes());//koarouter提供的routes方法注册路由
  app.use(inviteCode.routes());
};