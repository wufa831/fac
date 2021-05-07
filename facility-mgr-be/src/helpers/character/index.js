`
  -1无任何权限 
  0 管理员权限，不管有没有设置都能做
  1 增加
  2 删除
  3 查找
  4 修改
`;
const defaultCharacters = [
  {
    title: '管理员',
    name: 'admin',
    power: {
      facility: [0],
      order: [0],
      state: [0],
      user: [0],
      vendor: [0],
    },
  },
  {
    title: '成员',
    name: 'member',
    power: {
      facility: [3],
      order: [0],
      state: [0],
      user: [-1],
      vendor: [0],
    },
  },
];

module.exports = {
  defaultCharacters,
};