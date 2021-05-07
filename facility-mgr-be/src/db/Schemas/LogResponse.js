const mongoose = require('mongoose');
const { getMeta, preSave} = require('../helpers');

//用户的schema
//映射到用户文档的数据

const LogResponseSchema = new mongoose.Schema({
  logId: String,
  data:String,

  meta: getMeta(),//包括创建时间和修改时间，为通用语言信息
});

LogResponseSchema.pre('save', preSave);//在save之前做presave

mongoose.model('LogResponse', LogResponseSchema);