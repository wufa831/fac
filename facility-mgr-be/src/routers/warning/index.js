const Router = require('@koa/router');
const mongoose = require('mongoose');
const config = require('../../project.config');
const {getBody } = require('../../helpers/utils');


const Warning= mongoose.model('Warning');


const router = new Router({
  prefix: '/warning',
});

router.post('/add', async (ctx) => {//拿到前端提交上来的，放在数据库里
  const {  // 设备厂商
  vendor,
  // IMEI号
  IMEI,
  //ICCID串号
  ICCID,
  //SN号
  SN,
  //客户名称
  custom,
  //设备状态
  warntype,
  //场景属性
  todo,
  //安装行政区
  area,

  } = getBody(ctx);
  
  const warning = new Warning({
      // 设备厂商
  vendor,
  // IMEI号
  IMEI,
  //ICCID串号
  ICCID,
  //SN号
  SN,
  //客户名称
  custom,
  //设备状态
  warntype,
  //场景属性
  todo,
  //安装行政区
  area,
  });
  const res=await warning.save();
  
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
    query.IMEI = keyword;
  }
  const list = await Warning
    .find(query)
    .skip((page - 1) * size)//分页
    .limit(size)
    .exec();
  const total = await Warning.countDocuments();

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

router.post('/delete', async (ctx) => {
  const {
    id,
  } = ctx.request.body;

  const delMsg = await Warning.deleteOne({
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

  const one = await Warning.findOne({
    _id: id,
  }).exec();

  if (!one) {
    ctx.body = {
      code: 0,
      msg: '没找到设备',
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