const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  nickname: String,
  password: String,
  age:Number,
});

const UserModal = mongoose.model('User', UserSchema);

const connect = () => {
  mongoose.connect('mongodb://127.0.0.1:27017/facility-mgr');

  mongoose.connection.on('open', () => {
    console.log('连接成功');

    const user = new UserModal({
      nickname: 'xiaohong',
      password: '123456',
      age:12,
    });
    user.age = 99;
    user.save();
  });
};

connect();