const Router = require('@koa/router');
const mongoose = require('mongoose');

const User = mongoose.model('User');
const Facility = mongoose.model('Facility');
const Log = mongoose.model('Log');

const router = new Router({
  prefix: '/dashboard',
});

router.get('/base-info', async (ctx) => {
  const facilityTotal = await Facility.countDocuments();
  const userTotal = await User.countDocuments();
  const logTotal = await Log.countDocuments();

  ctx.body = {
    code: 1,
    msg: '获取成功',
    data: {
      total: {
        facility: facilityTotal,
        user: userTotal,
        log: logTotal,
      },
    },
  };
});

module.exports = router;
