import { del, post, get } from '@/helpers/request';


export const add = (form) => {
  return post(
    '/facility/add',
    form,
  );
};

export const list = (data) => {
  return get(
    '/facility/list',
    data,
  );
};

export const remove = (id) => {
  return post(
    '/facility/delete', {
      id,
    }
  );
};

export const update = (data={}) => {
  return post('/facility/update', 
    data,
  );
};

export const addMany = (key) => {
  return post('/facility/addMany', {
      key,
  });
};