const jwt = require('jsonwebtoken');
const config = require('../../project.config');
const koaJwt = require('koa-jwt');

const getToken = (ctx) => {
  let { authorization } = ctx.header;

  return authorization.replace('Bearer ', '').replace('bearer ', '');

};


const verify = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, config.JWT_SECRET, (err, payload) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(payload);
    });
  });
};

const middleware = (app) => {
  app.use(koaJwt({
    secret: config.JWT_SECRET,
  }).unless({//哪些接口不需要校验
    path: [
      /^\/auth\/login/,
      /^\/auth\/register/,
    ],
  }));
};

const catchTokenError = async (ctx, next) => {
  return next().catch((error) => {//捕获错误信息
    if (error.status === 401) {//401是token错误，否则继续抛错，不捕获
      ctx.status = 401;

      ctx.body = {
        code: 0,
        msg: 'token error',
      };
    } else {
      throw error;
    }
  });
};

module.exports = {
  verify,
  getToken,
  middleware,
  catchTokenError,
};