const { verify, getToken } = require('../token');
const mongoose = require('mongoose');

const Log = mongoose.model('Log');
const LogResponse = mongoose.model('LogResponse');

const logMiddleware = async (ctx, next) => {//中间件，先记录一些数据 再做next
  const startTime = Date.now();//开始时间

  await next();

  let payload = {};
  try {
    payload = await verify(getToken(ctx));//拿到token并解析 尝试解析 失败则拿到e
  } catch (e) {
    payload = {
      account: '未知用户',
      id: '',
    };
  }

  const url = ctx.url;

  const method = ctx.method;
  const status = ctx.status;

  let responseBody = '';
  if (typeof ctx.body === 'string') {
    responseBody = ctx.body;
  } else {
    try {
      responseBody = JSON.stringify(ctx.body);
    } catch {
      responseBody = '';
    }
  }

  const endTime = Date.now();//结束时间

  const log = new Log({
    user: {
      account: payload.account,
      id: payload.id,
    },
    request: {
      url,
      method,
      status,
    },

    endTime,
    startTime,
    
    });
  

    // 
    // show,
  

  log.save();

  const logRes = new LogResponse({
    logId: log._id,
    data: responseBody,
  });

  logRes.save();
};

module.exports = {
  logMiddleware,
};
