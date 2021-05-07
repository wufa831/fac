const Router = require('@koa/router');
const mongoose = require('mongoose');

const Log = mongoose.model('Log');

const router = new Router({
  prefix: '/log',
});

router.get('/list', async (ctx) => {

  let {
    page,
    size,
  } = ctx.query;

  page = Number(page);
  size = Number(size);

  const list = await Log
    .find()
    .sort({
      _id:-1,//由新到旧排列
    })
    .skip((page - 1) * size)//分页
    .limit(size)
    .exec();
  
  const total = await Log.countDocuments();
  
  ctx.body = {
    data: {
      list,
      page,
      size,
      total,
    },
    code: 1,
    msg: '获取列表成功'
  };

});

module.exports = router;