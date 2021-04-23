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
  // const {
  //   page = 1,
  //   keyword='',
  // } = ctx.query;

  // let = {
  //   size=10,
  // }=ctx.query;

  // size = Number(size);


  // const query = {};
  // if (keyword) {
  //   query.vendorname = keyword;
  // }

  // const list = await Vendor
  //   .find(query)
  //   .skip((page - 1) * size)
  //   .limit(size)
  //   .exec();
  
  // const total = await Vendor.countDocuments().exec();
  // ctx.body = {
  //   data: {
  //     total,
  //     list,
  //     page,
  //     size,
  //   },
  //   code: 1,
  //   msg: 'list success',
  // };
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



// router.post('/reset/password', async (ctx) => {
//   const {
//     id,  
//   } = ctx.request.body;

//   const user = await User.findOne({
//     _id: id,
//   }).exec();

//   if (!user) {
//     ctx.body = {
//       msg: "找不到用户",
//       code: 0,
//     };
//     return;
//   }

//   user.password = config.DEFAULT_PASSWORD;

//   const res = await user.save();

//   ctx.body = {
//     msg: '修改成功',
//     data: {//不能把密码也返回回去，所以重定义了data
//       account: res.account,
//       _id: res._id,
//     },
//     code: 1,
//   };
// });

module.exports = router;