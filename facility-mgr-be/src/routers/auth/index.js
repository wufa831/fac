const Router = require('@koa/router');
const mongoose = require('mongoose');
// const { connect } = require('../../db');
const {getBody } = require('../../helpers/utils');
const jwt = require('jsonwebtoken');
const User= mongoose.model('User');
const InviteCode = mongoose.model('InviteCode');
const config = require('../../project.config');

const router = new Router({
  prefix: '/auth',
});
//以下接口都用于处理auth
//既注册与登录
router.post('/register', async (ctx) => {
  const {
    account,
    password,
    inviteCode,
  } = getBody(ctx);
//表单校验
  if (account === ''||password === ''||inviteCode==='') {
    ctx.body = {
      code: 0,
      msg: '字段不能为空',
      data:null,
    };
    return;
  }

//找有没有yaoqingma
  const findCode = await InviteCode.findOne({
    code:inviteCode,
  }).exec();

  if ((!findCode)||findCode.user) {
      ctx.body = {
      code: 0,
      msg: '邀请码不正确',
      data:null,
    };
    return;
  }

  
//去找accou为传递上来的account的用户
  const findUser = await User.findOne({
    account,
  }).exec();
//判断用户是否存在
  if (findUser) {
    ctx.body = {
      code: 0,
      msg: '已存在该用户',
      data:null,
    };
    return;
  }
//创建用户
  const user = new User({
    account,
    password,
  });
//把创建的用户同步到mongodb
  const res = await user.save();
//res._id是用户唯一标志，findCode.user 指示邀请码用于哪个用户
  findCode.user = res._id;
  findCode.meta.updatedAt = new Date().getTime();
//保存更改过的findcode 返回的是promise所以用await
  await findCode.save();
//响应成功
  ctx.body = {
    code: 1,
    msg: '注册成功',
    data:res,
  };
});

router.post('/login', async (ctx) => {
  const {
    account,
    password,
  } = getBody(ctx);

  const one =await User.findOne({
    account,
  }).exec();
//做表单校验
  if (account === ''||password === '') {
    ctx.body = {
      code: 0,
      msg: '字段不能为空',
      data:null,
    };
    return;
  }

  
  if (!one) {
    ctx.body = {
      code: 0,
      msg: '用户名或密码错误',
      data: null,
    };
  
    return;
  }

  const user = {
    account: one.account,
    character:one.character,
    _id: one._id,//mongdb自动生成
  };
  if (one.password === password) {
    ctx.body = {
      code: 1,
      msg: '登入成功',
      data: {
        user,
        token: jwt.sign(user, config.JWT_SECRET),
        //one对象不能直接被jwt处理
      },
    };
    return;
  }

  ctx.body = {
    code: 0,
    msg: '用户名或密码错误',
    data: null,
  };
});
module.exports = router;