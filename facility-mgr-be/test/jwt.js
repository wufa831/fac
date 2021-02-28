var jwt = require('jsonwebtoken');
var token = jwt.sign({ 
  account: 'a.cc.com',
  _id:'123',
}, 'aaaa');

console.log(token);
//token=header.payload.signature
//header:加密的算法sha256，标记
//payload：服务端想拿到的信息,account id 等，传递的第一个参数
//signature：签证相关，传递的第二个参数，解密的密钥
//iat表示签发时间

jwt.verify(token, 'aaaa', (err, payload) => {
  console.log(err, payload);
});