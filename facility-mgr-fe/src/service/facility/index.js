import axios from 'axios';
import { getToken } from '@/helpers/token';

axios.defaults.headers['Authorization'] = `Bearer ${getToken()}`;


export const add = (form) => {
  return axios.post(
    'http://localhost:3000/facility/add',
    form,
  );
};

export const list = (data) => {
  return axios.get(
    'http://localhost:3000/facility/list',
    {
      params: data,
      
    },
  );
};

export const remove = (id) => {
  return axios.post(
    'http://localhost:3000/facility/delete', {
      id,
    }
  );
};

export const update = (data={}) => {
  return axios.post('http://localhost:3000/facility/update', 
    data,
  );
};

export const addMany = (key) => {
  return axios.post('http://localhost:3000/facility/addMany', {
      key,
  });
};