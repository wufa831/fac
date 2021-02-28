import axios from 'axios';

export const register = (account,password,inviteCode) => {
  return axios.post('http://localhost:3000/auth/register', {//返回的是promise
    account,
    password,
    inviteCode,
  });
};

export const login = (account,password) => {
  return axios.post('http://localhost:3000/auth/login', {
    account,
    password,
  });
};