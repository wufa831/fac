import { message } from 'ant-design-vue';

export const result = (response,authShowErrorMsg=true) => { //处理请求结果
  const { data } = response;//请求下的数据
  
  if ((data.code === 0) && authShowErrorMsg) {
    message.error(data.msg);
  }
  return {
    //cb callback
    success(cb) {
      if (data.code !== 0) {
        cb(data, response);
      }
      return this;//形成链式调用
    },
    fail(cb) {
      if (data.code === 0) {
        cb(data,response);
      }
      return this;
    },
    finally(cb) {
      cb(data, response);
      return this;
    },
  };
};