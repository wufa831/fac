import { del, post, get } from '@/helpers/request';

export const list = (page,size,keyword1,keyword2) => {
  return get(
    '/log/list', {
      
        page,
        size,
      keyword1,
      keyword2,
      
    });
};

