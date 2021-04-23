const mongoose = require('mongoose');
const { getMate } = require('../helpers');

//供应商
//映射到用户文档的数据

const VendorSchema = new mongoose.Schema({
  vendorname: String,
  no: String,
  contact: String,
  tel: String,
  address:String,

  meta: getMate(),//包括创建时间和修改时间，为通用语言信息
});

mongoose.model('Vendor', VendorSchema);