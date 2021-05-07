const mongoose = require('mongoose');
const { getMeta ,preSave} = require('../helpers');

//用户的schema
//映射到用户文档的数据

const LogSchema = new mongoose.Schema({
  user: {
    account: String,
    id:String,
  },

  request: {
    method: String,
    url: String,
    status:Number,
  },

  startTime: Number,
  endTime:Number,

  meta: getMeta(),//包括创建时间和修改时间，为通用语言信息
});

LogSchema.pre('save', preSave);

mongoose.model('Log', LogSchema);