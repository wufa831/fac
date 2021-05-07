import axios from 'axios';

export const add = (form) => {
  return axios.post(
    'http://localhost:3000/state/add',
    form,
  );
};

export const list = (data) => {
  return axios.get(
    'http://localhost:3000/state/list',
    {
      params:data,
    },
  );
};

export const remove = (id) => {
  return axios.delete(
    `http://localhost:3000/state/${id}`,
  );
};

export const update = (data={}) => {
  return axios.post('http://localhost:3000/state/update', 
    data,
  );
};