import { del, post, get } from '@/helpers/request';

export const list = (data) => {
  return get('/warning/list',
    data,
  );
};

export const add = (form) => {
  return post(
    '/warning/add', 
    form,
  );
};

export const remove = (id) => {
  return del(`/warning/${id}`);
};

export const update = (data={}) => {
  return post('/warning/update', 
    data,
  );
};
