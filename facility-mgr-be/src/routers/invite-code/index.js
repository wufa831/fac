const Router = require('@koa/router');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
// const {getBody } = require('../../helpers/utils');

const InviteCode= mongoose.model('InviteCode');

const router = new Router({
  prefix: '/invite',
});

router.post('/add', async (ctx) => {//ctx取到后生成随机数uuid作为邀请码
  const code = new InviteCode({
    code: uuidv4(),
    user:'',
  });

  const saved = await code.save();
  
  ctx.body = {
    code: 1,
    data: saved,
    msg: '创建成功',
  }
});
module.exports = router;