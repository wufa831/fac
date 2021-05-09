
import { del, post, get } from '@/helpers/request';
export const list = (data) => {
  return get('/vendor/list',data,
  );
};

export const add = (form) => {
  return post(
    '/vendor/add', 
    form,
  );
};

export const remove = (id) => {
  return del(`/vendor/${id}`);
};

export const update = (data={}) => {
  return post('/vendor/update', 
    data,
  );
};
