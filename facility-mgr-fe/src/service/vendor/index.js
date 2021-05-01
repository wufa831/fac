import axios from 'axios';

export const list = (data) => {
  return axios.get('http://localhost:3000/vendor/list',
    {//返回的是promise
      params:data,
    },
  );
};

export const add = (form) => {
  return axios.post(
    'http://localhost:3000/vendor/add', 
    form,
  );
};

export const remove = (id) => {
  return axios.delete(`http://localhost:3000/vendor/${id}`);
};

export const update = (data={}) => {
  return axios.post('http://localhost:3000/vendor/update', 
    data,
  );
};
