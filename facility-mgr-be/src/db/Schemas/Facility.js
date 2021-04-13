const mongoose = require('mongoose');
const { getMate } = require('../helpers');

//用户的schema
//映射到用户文档的数据

const FacilitySchema = new mongoose.Schema({
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
  state:String,
  //场景属性
  scene:String,
  //安装行政区
  area:String,
  //激活时间
  activeTime:String,

  meta: getMate(),//包括创建时间和修改时间，为通用语言信息
});

mongoose.model('Facility', FacilitySchema);