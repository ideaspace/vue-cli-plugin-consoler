import * as types from '../mutation-types';
import {getUser} from './../../apis/users';

interface UserVO {
  username?: string;
  userAccount?: string;
}

const state: UserVO = {
  userAccount: '',
  username: '',
};

const actions = {
  async createUserData({commit, state}: any) {
    // 1. Check if we already have the user as a current user.
    if (state.userAccount) {
      return Promise.resolve(state);
    }
    try {
      const r = await getUser();
      if (r.data.code === 0) {
        commit(types.USER_DATA_CREATE, r.data.data);
      }
    } catch (e) {
    }
  },
  deleteUserData({commit}: any) {
    commit(types.USER_DATA_CREATE, null);
  },
};

const mutations = {
  [types.USER_DATA_CREATE](state: UserVO, data: UserVO) {
    if (data) {
      const {
        username,
        userAccount,
      } = data;
      state.username = username;
      state.userAccount = userAccount;
    } else {
      state.username = '';
      state.userAccount = '';
    }
  },
};

const getters = {
  userAccount: (state: UserVO) => state.userAccount,
  username: (state: UserVO) => state.username,
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
