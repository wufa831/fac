import axios from 'axios';

export const list = (data) => {
  return axios.get('http://localhost:3000/order/list',
    {//返回的是promise
      params:data,
    },
  );
};

export const add = (form) => {
  return axios.post(
    'http://localhost:3000/order/add', 
    form,
  );
};

export const remove = (id) => {
  return axios.delete(`http://localhost:3000/order/${id}`);
};

export const update = (data={}) => {
  return axios.post('http://localhost:3000/order/update', 
    data,
  );
};
