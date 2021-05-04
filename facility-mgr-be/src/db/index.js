const mongoose = require('mongoose');
require('./Schemas/User');
require('./Schemas/InviteCode');//require就会执行这个文件进行注册model
require('./Schemas/Vendor');
require('./Schemas/Facility');
require('./Schemas/Order');
require('./Schemas/State');
const connect = async () => {
  return new Promise((resolve) => {
    mongoose.connect('mongodb://127.0.0.1:27017/facility-mgr');

    mongoose.connection.on('open', () => {//数据库打开成功时提示
      console.log('连接数据库成功');


      resolve();

  });
  });


};

module.exports = {
  connect,
};