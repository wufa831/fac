const fs = require('fs');

const saveFileToDisk = (ctx, filename) => {
  return new Promise((resolve, reject) => {
    const file = ctx.request.files.file;
    const reader = fs.createReadStream(file.path);//读写流
    const writeStream = fs.createWriteStream(filename);//读写流

    reader.pipe(writeStream);//每当读到流就去 写

    reader.on('end', () => {
      resolve(filename);
    });

    reader.on('error', (err) => {
      reject(err);
    });
  });
};

const getUploadFileExt = (ctx) => {//获取文件名字
  const { name = '' } = ctx.request.files.file;

  return name.split('.').pop();
};

module.exports = {
  saveFileToDisk,
  getUploadFileExt,
};
