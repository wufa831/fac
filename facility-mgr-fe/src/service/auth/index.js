// import { del, post, get } from '@/helpers/request';
import { del, post, get } from '@/helpers/request';

export const register = (account,password,inviteCode) => {
  return post('/auth/register', {//返回的是promise
    account,
    password,
    inviteCode,
  });
};

export const login = (account,password) => {
  return post('/auth/login', {
    account,
    password,
  });
};