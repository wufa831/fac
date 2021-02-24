const mongoose = require('mongoose');
const { getMate } = require('../helpers');

//用户的schema
//映射到用户文档的数据

const UserSchema = new mongoose.Schema({
  account: String,
  password: String,

  meta: getMate(),//包括创建时间和修改时间，为通用语言信息
});

mongoose.model('User', UserSchema);