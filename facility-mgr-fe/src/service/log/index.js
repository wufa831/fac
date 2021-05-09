import { del, post, get } from '@/helpers/request';

export const list = (page,size) => {
  return get(
    '/log/list', {
      
        page,
        size,
      
    });
};

