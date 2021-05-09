const jwt = require('jsonwebtoken');
const config = require('../../project.config');
const koaJwt = require('koa-jwt');
const mongoose = require('mongoose');

const User = mongoose.model('User');
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

const middleware = (app) => {//校验token是否能被解析
  app.use(koaJwt({
    secret: config.JWT_SECRET,
  }).unless({//哪些接口不需要校验
    path: [
      /^\/auth\/login/,
      /^\/auth\/register/,
      /^\/forget-password\/add/,
    ],
  }));
};

const res401 = (ctx) => {
  ctx.status = 401;
  ctx.body = {
    code: 0,
    msg: '用户校验失败',
  };
};

const checkUser = async (ctx, next) => {//token解析出的用户是否存在,用户account character是否正确
  const { path } = ctx;
  if (path === '/auth/login' || path === '/auth/register' || path === '/forget-password/add') {
    await next();
    return;
  }

  const { _id, account, character } = await verify(getToken(ctx));//解析

  const user = await User.findOne({
    _id,
  }).exec();

  if (!user) {
    res401(ctx);
    return;
  }

  if (account !== user.account) {
    res401(ctx);
    return;
  }

  if (character !== user.character) {
    res401(ctx);
    return;
  }

  await next();
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
  checkUser,
};