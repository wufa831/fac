const mongoose = require('mongoose');
const { getMeta,preSave } = require('../helpers');

//用户的schema
//映射到用户文档的数据

const InviteCodeSchema = new mongoose.Schema({
  code: String,//邀请码
  user: String,//用u于谁
  

  meta: getMeta(),//包括创建时间和修改时间，为通用语言信息
});

InviteCodeSchema.pre('save', preSave);

mongoose.model('InviteCode', InviteCodeSchema);