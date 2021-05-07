const Koa = require('koa');
const koaBody = require('koa-body');
const Body = require('koa-body');
const { connect } = require('./db');
const registerRoutes = require('./routers');
const cors = require('@koa/cors');
const { middleware: koaJwtMiddleware,catchTokenError } = require('./helpers/token');
//解决跨域问题 在http请求头上加上标志
const { logMiddleware } = require('./helpers/log');

const app = new Koa();

connect().then(() => {//注册中间件
  app.use(cors());    //解决跨域问题
  app.use(koaBody()); //请求体
  
  // app.use(catchTokenError);

  // koaJwtMiddleware(app);

  app.use(logMiddleware);

  registerRoutes(app);//注册路由
  
//监听端口
  app.listen(3000, () => {
    console.log('start success');
  });
});

