import store from '@/store';

export const isAdmin = () => {
  const uc = store.state.userCharacter;
  // console.log(uc);
  return uc.name === 'admin';
};

export const isSuperAdmin = () => {
  const uc = store.state.userCharacter;
  return uc.name === 'superadmin';
};

export const getCharacterInfoById = (id) => {
  const { characterInfo } = store.state;

  const one = characterInfo.find((item) => {
    return item._id === id;
  });

  return one || {
    title: '未知角色',
  };

};