import { del, post, get } from '@/helpers/request';

export const list = (data) => {
  return get('/order/list',
    data,
  );
};

export const add = (form) => {
  return post(
    '/order/add', 
    form,
  );
};

export const remove = (id) => {
  return del(`/order/${id}`);
};

export const update = (data={}) => {
  return post('/order/update', 
    data,
  );
};
