const auth = require('./auth');
const inviteCode = require('./invite-code');
const facility = require('./facility');


module.exports = (app) => {
  app.use(auth.routes());//koarouter提供的routes方法注册路由
  app.use(inviteCode.routes());
  app.use(facility.routes());
};