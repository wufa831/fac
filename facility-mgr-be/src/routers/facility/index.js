const Router = require('@koa/router');
const mongoose = require('mongoose');
const {getBody } = require('../../helpers/utils');

const Facility= mongoose.model('Facility');

const router = new Router({
  prefix: '/facility',
});

router.post('/add', async (ctx) => {//拿到前端提交上来的，放在数据库里
  const {
    vendor,
    IMEI,
    ICCID,
    SN,
    custom,
    state,
    scene,
    area,
    activeTime,
  } = getBody(ctx);
  
  const facility = new Facility({
    vendor,
    IMEI,
    ICCID,
    SN,
    custom,
    state,
    scene,
    area,
    activeTime,
  });
  const res=await facility.save();
  
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
    query.vendor = keyword;
  }
  const list = await Facility
    .find(query)
    .skip((page - 1) * size)//分页
    .limit(size)
    .exec();
  const total = await Facility.countDocuments();

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

  const delMsg = await Facility.deleteOne({
    _id: id,
  });

  ctx.body = {
    data: delMsg,
    msg: '删除成功',
    code: 1,
  };
});

module.exports = router;