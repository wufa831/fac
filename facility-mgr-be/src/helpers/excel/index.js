const xlsx = require('node-xlsx');

const loadExcel = (path) => {
  // return xlsx.parse('D:\\mooc\\facility-mgr\\facility-mgr-be\\upload\\70bbb283-63d0-485e-81cf-9c95971a6997.xlsx');
  return xlsx.parse(path);
};

const getFirstSheet = (sheets) => {
  return sheets[0].data;//解析出execl中数据，工作表1
};

//选择文件上传
// 服务端得到文件返回key
// 前端请求对应业务接口：服务端根据key拿到文件 解析execl放到数据库

module.exports = {
  loadExcel,
  getFirstSheet,
};
