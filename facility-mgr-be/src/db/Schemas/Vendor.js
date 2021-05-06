const mongoose = require('mongoose');
const { getMeta,preSave } = require('../helpers');

//供应商
//映射到用户文档的数据

const VendorSchema = new mongoose.Schema({
  vendorname: String,
  no: String,
  contact: String,
  tel: String,
  address:String,

  meta: getMeta(),//包括创建时间和修改时间，为通用语言信息
});

VendorSchema.pre('save', preSave);

mongoose.model('Vendor', VendorSchema);