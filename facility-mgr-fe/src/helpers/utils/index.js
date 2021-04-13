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

export const clone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

export const formatTimestamp = (ts) => {
  const date = new Date(Number(ts));
  const YYYY = date.getFullYear();
  const MM = date.getMonth() + 1;
  const DD = date.getDate();

  const hh = date.getHours();
  const mm = date.getMinutes();
  const ss = date.getSeconds();

  return `${YYYY}/${MM}/${DD} ${hh}:${mm}:${ss}`;

};
