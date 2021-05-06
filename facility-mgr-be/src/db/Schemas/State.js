const mongoose = require('mongoose');
const { getMeta,preSave } = require('../helpers');

//用户的schema
//映射到用户文档的数据

const StateSchema = new mongoose.Schema({
//场景名称
  statename:String,
//类型
  statetype: String,
//是否布防，布防则同步到设备
  isuse:String,
//门开时长
  actiontime:Number,
//电量预警
  power:Number,

  meta: getMeta(),//包括创建时间和修改时间，为通用语言信息
});

StateSchema.pre('save', preSave);

mongoose.model('State', StateSchema);