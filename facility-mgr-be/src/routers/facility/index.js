const Router = require('@koa/router');
const mongoose = require('mongoose');
const config = require('../../project.config');
const {getBody } = require('../../helpers/utils');
const { loadExcel, getFirstSheet } = require('../../helpers/excel');
const xlsx = require('node-xlsx');


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
    keyword1 = '',
    keyword2='',
  } = ctx.query;

  let = {
    size=10,
  }=ctx.query;

  size = Number(size);

  const query = {};
  if (keyword1) {
    query.vendor = keyword1;
  }
  if (keyword2) {
    query.IMEI = keyword2;
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

router.post('/delete', async (ctx) => {
  const {
    id,
  } = ctx.request.body;

  const delMsg = await Facility.deleteOne({
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

  const one = await Facility.findOne({
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

router.post('/addMany' , async(ctx) => {
  const {
    key = '',
  } = ctx.request.body;
 
const path = `${config.UPLOAD_DIR}/${key}`;
 
const excel = loadExcel(path);
 
const sheet = getFirstSheet(excel);
 

 const arr = [];
  for (let i = 0; i < sheet.length; i++) {
    let record = sheet[i];

    const [
      vendor,
      IMEI,
      ICCID,
      SN,
      custom,
      state,
      scene,
      area,
      activeTime,
    ] = record;

    arr.push({
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
  }
 
  await Facility.insertMany(arr);
 
  ctx.body = {
    code:1,
    msg: '添加成功',
    data: {
      addCount: arr.length,
    },
  };
 
});


module.exports = router;