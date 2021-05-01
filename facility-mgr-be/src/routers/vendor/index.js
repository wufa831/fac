const Router = require('@koa/router');
const mongoose = require('mongoose');
const { getBody } = require('../../helpers/utils');

const Vendor= mongoose.model('Vendor');

const router = new Router({
  prefix: '/vendor',
});

router.post('/add', async (ctx) => {
  const {
    vendorname,
    no,
    contact,
    tel,
    address,
  } = getBody(ctx);
  
  const vendor = new Vendor({
    vendorname,
    no,
    contact,
    tel,
    address,
    
  });

  const res = await vendor.save();

  ctx.body = {
    data: res,
    code: 1,
    msg: "添加成功",
  };
});


router.get('/list', async (ctx) => {

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
    query.vendorname = keyword;
  }  

  const list = await Vendor
    .find(query)
    .skip((page - 1) * size)//分页
    .limit(size)
    .exec();
 

  const total = await Vendor.countDocuments().exec();
  
  ctx.body = {
    data: {
          total,
          list,
          page,
          size,
        },
    code: 1,
    msg:'获取列表成功',
  }

});

router.delete('/:id', async (ctx) => {
  const {
    id,
  } = ctx.params;

  const delMsg = await Vendor.deleteOne({
    _id: id,
  });

  ctx.body = {
    data: delMsg,
    code: 1,
    msg: '删除成功',
  };
});

router.post('/update', async (ctx) => {
  const {
    id,
    ...others//other必须是最后一个元素，加了逗号会报错因为默认后面还有别的元素
  } = ctx.request.body;

  const one = await Vendor.findOne({
    _id: id,
  }).exec();

  if (!one) {
    ctx.body = {
      code: 0,
      msg: '没找到厂商',
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
    msg: '修改成功',
    code: 1,
  };

});



module.exports = router;