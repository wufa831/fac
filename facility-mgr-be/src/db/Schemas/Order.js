const mongoose = require('mongoose');
const { getMate } = require('../helpers');

//用户的schema
//映射到用户文档的数据

const OrderSchema = new mongoose.Schema({
  no: Number,
  custom: String,
  sum: Number,
  kind: String,
  

  meta: getMate(),//包括创建时间和修改时间，为通用语言信息
});

mongoose.model('Order', OrderSchema);