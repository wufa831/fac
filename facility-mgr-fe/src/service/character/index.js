import axios from 'axios';

// export const add = (form) => {
//   return axios.post(
//     'http://localhost:3000/facility/add',
//     form,
//   );
// };

export const list = () => {
  return axios.get(
    'http://localhost:3000/character/list',
   
  );
};

// export const remove = (id) => {
//   return axios.delete(
//     // 'http://localhost:3000/facility/'+id,
//     `http://localhost:3000/facility/${id}`,
//   );
// };

// export const update = (data={}) => {
//   return axios.post('http://localhost:3000/facility/update', 
//     data,
//   );
// };
// export const login = (account,password) => {
//   return axios.post('http://localhost:3000/auth/login', {
//     account,
//     password,
//   });
// };