const mongoose = require('mongoose');
const { getMeta, preSave} = require('../helpers');

//用户的schema
//映射到用户文档的数据

const WarningSchema = new mongoose.Schema({
  // 设备厂商
  vendor:String,
  // IMEI号
  IMEI: Number,
  //ICCID串号
  ICCID:Number,
  //SN号
  SN:Number,
  //客户名称
  custom:String,
  //设备状态
  warntype:String,
  //场景属性
  todo:String,
  //安装行政区
  area:String,
  //激活时间
  warninglog: String,

  user:String,
  
  meta: getMeta(),//包括创建时间和修改时间，为通用语言信息
});

WarningSchema.pre('save', preSave);//在save之前做presave

mongoose.model('Warning', WarningSchema);