const path = require('path');//用path处理路径

module.exports = {
  DEFAULT_PASSWORD: '123123',//配置项
  JWT_SECRET: 'facility-mgr',
  UPLOAD_DIR: path.resolve(__dirname, '../upload'),

  SERVER_PORT: 3000,
};