const Router = require('@koa/router');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
// const {getBody } = require('../../helpers/utils');
const config = require('../../project.config');

const User = mongoose.model('User');
const Character = mongoose.model('Character');
const { verify,getToken } = require('../../helpers/token');


const router = new Router({
  prefix: '/user',
});

router.get('/list', async (ctx) => {
  let {
    page,
    size,
    keyword,
  } = ctx.query;

  page = Number(page);
  size = Number(size);

  const query = {};
  if (keyword) {
    query.account = keyword;
  }

  const list = await User
    .find(query)
    .sort({
      _id:-1,//由新到旧排列
    })
    .skip((page - 1) * size)
    .limit(size)
    .exec();
  
  const total = await User.countDocuments().exec();

  ctx.body = {
    msg: '获取列表成功',
    data: {
      list,
      page,
      size,
      total,
    },
    code:1,
  };
});

router.delete('/:id', async (ctx) => {
  const {
    id,
  } = ctx.params;

  const delMsg=await User.deleteOne({
    _id: id,
  });

  ctx.body = {
    data: delMsg,
    code: 1,
    msg: '删除成功',
  };
});

router.post('/add', async (ctx) => {
  const {
    account,
    password,
    character,
  } = ctx.request.body;
  
  const char = await Character.findOne({
    _id: character,
  });
  if (!char) {
    ctx.body = {
      msg: '出错了',
      code: 0,
    };
    return;
  }
    
  const user = new User({
    account,
    password:password||'123123',
    character,
  });

  const res = await user.save();

  ctx.body = {
    data: res,
    code: 1,
    msg: "添加成功",
  };
});

router.post('/reset/password', async (ctx) => {
  const {
    id,  
  } = ctx.request.body;

  const user = await User.findOne({
    _id: id,
  }).exec();

  if (!user) {
    ctx.body = {
      msg: "找不到用户",
      code: 0,
    };
    return;
  }

  user.password = config.DEFAULT_PASSWORD;

  const res = await user.save();

  ctx.body = {
    msg: '修改成功',
    data: {//不能把密码也返回回去，所以重定义了data
      account: res.account,
      _id: res._id,
    },
    code: 1,
  };
});

router.post('/update/character', async (ctx) => {
  const {
    character,
    userId,
  } = ctx.request.body;

  const char = await Character.findOne({
    _id: character,
  });
  if (!char) {
    ctx.body = {
      msg: '出错了',
      code: 0,
    };
    return;
  }

  const user = await User.findOne({
    _id: userId,
  }).exec();

  if (!user) {
    ctx.body = {
      code: 0,
      msg: '出错了',
    };
    return;
  }
  
  user.character = character;

  const res = await user.save();

  ctx.body = {
    data:res,
    msg: '修改成功',
    code: 1,
  };

});

router.get('/info', async (ctx) => {
  //token在请求头的authorization:Bearer $xxx

  ctx.body = {
    data: await verify(getToken(ctx)),
    code: 1,
    msg:'获取成功',
  }

});
module.exports = router;