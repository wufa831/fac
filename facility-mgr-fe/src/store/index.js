import { createStore } from 'vuex';
import { character,user } from '@/service';
import { result } from '@/helpers/utils';
import { getCharacterInfoById } from '@/helpers/character';

export default createStore({
  state: {
    characterInfo: [],
    userInfo: {},
    userCharacter:{},
  },
  mutations: {//函数集合
    setCharacterInfo(state, characterInfo) {
      state.characterInfo = characterInfo;
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    },
    setUserCharacter(state, userCharacter) {
      state.userCharacter = userCharacter;
    },
  },
  actions: {//拿数据
    async getCharacterInfo(store) {
      const res = await character.list();
      // console.log(res);

      result(res)
        .success(({ data }) => {
          store.commit('setCharacterInfo', data);
        });
    },

    async getUserInfo(store) {
      const res = await user.info();

      result(res)
        .success(({ data }) => {
          store.commit('setUserInfo', data);

          store.commit('setUserCharacter', getCharacterInfoById(data.character));

          // console.log(store.state);
        });
    },
  },
});
