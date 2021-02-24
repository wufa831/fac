const auth = require('./auth/index');

module.exports = (app) => {
  app.use(auth.routes());//koarouter提供的routes方法注册路由
};