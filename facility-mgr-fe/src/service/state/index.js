import { del, post, get } from '@/helpers/request';

export const add = (form) => {
  return post(
    '/state/add',
    form,
  );
};

export const list = (data) => {
  return get(
    '/state/list',data,
  );
};

export const remove = (id) => {
  return del(
    `/state/${id}`,
  );
};

export const update = (data={}) => {
  return post('/state/update', 
    data,
  );
};
