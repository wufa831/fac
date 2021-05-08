const auth = require('./auth');
const inviteCode = require('./invite-code');
const facility = require('./facility');
const user = require('./user');
const vendor = require('./vendor');
const order = require('./order');
const state = require('./state');
const character = require('./character');
const log = require('./log');
const forgetpassword = require('./forget-password');
const profile = require('./profile');
const dashboard = require('./dashboard');
const upload = require('./upload');

module.exports = (app) => {
  app.use(auth.routes());//koarouter提供的routes方法注册路由
  app.use(inviteCode.routes());
  app.use(facility.routes());
  app.use(user.routes());//注册中间件
  app.use(vendor.routes());
  app.use(order.routes());
  app.use(state.routes());
  app.use(character.routes());
  app.use(log.routes());
  app.use(forgetpassword.routes());
  app.use(profile.routes());
  app.use(dashboard.routes());
  app.use(upload.routes());
};