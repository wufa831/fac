import axios from 'axios';

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
      params:data,
    },
  );
};

export const remove = (id) => {
  return axios.delete(
    // 'http://localhost:3000/facility/'+id,
    `http://localhost:3000/facility/${id}`,
  );
};

// export const login = (account,password) => {
//   return axios.post('http://localhost:3000/auth/login', {
//     account,
//     password,
//   });
// };