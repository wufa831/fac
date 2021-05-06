const mongoose = require('mongoose');
const { getMeta ,preSave} = require('../helpers');

//用户的schema
//映射到用户文档的数据

const CharacterSchema = new mongoose.Schema({
  name: String,//member admin
  title: String,//成员 管理员
  power:Object,

  meta: getMeta(),//包括创建时间和修改时间，为通用语言信息
});

CharacterSchema.pre('save', preSave);

mongoose.model('Character', CharacterSchema);