const Router = require('@koa/router');
const { v4: uuidv4 } = require('uuid');
const config = require('../../project.config');
const { saveFileToDisk, getUploadFileExt } = require('../../helpers/upload');
const path = require('path');

// const { getBody } = require('../../helpers/utils');

const router = new Router({
  prefix: '/upload',
});

router.post('/file', async (ctx) => {
  const ext = getUploadFileExt(ctx);
  const filename = `${uuidv4()}.${ext}`;//文件名用uuid随机
  await saveFileToDisk(
    ctx, path.resolve(config.UPLOAD_DIR, filename)
  );

  ctx.body = {
    data: filename,
    msg: '',
    code: 1,
  };
});

module.exports = router;
