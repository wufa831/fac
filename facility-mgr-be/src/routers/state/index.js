const Router = require('@koa/router');
const mongoose = require('mongoose');
const {getBody } = require('../../helpers/utils');

const State= mongoose.model('State');

const router = new Router({
  prefix: '/state',
});

router.post('/add', async (ctx) => {//拿到前端提交上来的，放在数据库里
  const {
    statename,
    //类型
    statetype,
    //是否布防，布防则同步到设备
    isuse,
    //门开时长
    actiontime,
    //电量预警
    power,
  } = getBody(ctx);
  
  const state = new State({
    statename,
    //类型
    statetype,
    //是否布防，布防则同步到设备
    isuse,
    //门开时长
    actiontime,
    //电量预警
    power,
  });
  const res=await state.save();
  
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
    keyword2 = '',
  } = ctx.query;

  let = {
    size=10,
  }=ctx.query;

  size = Number(size);

  const query = {};
  if (keyword2) {
    if(keyword2==="独居老人")
      query.statetype = '0';
    if(keyword2==="常规监控")
      query.statetype = '1';
    if (keyword2 === "常开门")
      query.statetype = "2";
    if(keyword2==="常闭门")
      query.statetype = '3';
    
  }
  if (keyword1) {
    query.statename = keyword1;
  }
  const list = await State
    .find(query)
    .skip((page - 1) * size)//分页
    .limit(size)
    .exec();
  const total = await State.countDocuments();

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

  const delMsg = await State.deleteOne({
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

  const one = await State.findOne({
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