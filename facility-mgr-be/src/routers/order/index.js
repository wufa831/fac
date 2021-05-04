const Router = require('@koa/router');
const mongoose = require('mongoose');
const {getBody } = require('../../helpers/utils');

const Order= mongoose.model('Order');

const router = new Router({
  prefix: '/order',
});

router.post('/add', async (ctx) => {//拿到前端提交上来的，放在数据库里
  const {
    no,
    custom,
    sum,
    kind,
  } = getBody(ctx);
  
  const order = new Order({
    no,
    custom,
    sum,
    kind,
  });
  const res=await order.save();
  
  ctx.body = {
    data:res,
    code:1,
    msg:'添加成功',
  };
});

router.get('/list', async (ctx) => {    //获取所有列表作出响应
  
  const {
    page = 1,
    keyword='',
  } = ctx.query;

  let = {
    size=10,
  }=ctx.query;

  size = Number(size);

  const query = {};
  if (keyword) {
    query.no = keyword;
  }
  const list = await Order
    .find(query)
    .skip((page - 1) * size)//分页
    .limit(size)
    .exec();
  const total = await Order.countDocuments();

  ctx.body = {
    data: {
      total,
      list,
      page,
      size,
    },
    code: 1,
    msg: 'list success',
  };
});

router.delete('/:id', async (ctx) => {
  const {
    id,
  } = ctx.params;

  const delMsg = await Order.deleteOne({
    _id: id,
  });

  ctx.body = {
    data: delMsg,
    msg: '删除成功',
    code: 1,
  };
});

router.post('/update', async (ctx) => {
  const {
    id,
    ...others//other必须是最后一个元素，加了逗号会报错因为默认后面还有别的元素
  } = ctx.request.body;

  const one = await Order.findOne({
    _id: id,
  }).exec();

  if (!one) {
    ctx.body = {
      code: 0,
      msg: '没找到订单',
    };
    return;
  }
  
  const newQuery = {};
  Object.entries(others).forEach(([key,value]) => {
    if (value) {
      newQuery[key] = value;
    }
  });

  Object.assign(one, newQuery);

  const res= await one.save();

  ctx.body = {
    data:res,
    msg:'修改成功',
    code: 1,
  };

});
module.exports = router;