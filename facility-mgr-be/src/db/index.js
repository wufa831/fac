const mongoose = require('mongoose');
require('./Schemas/User');

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