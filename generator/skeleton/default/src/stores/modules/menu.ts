import * as types from '../mutation-types';
import {Commit} from 'vuex';
import {getMenuTree, MenuVO} from '@/apis/menu';

interface State {
  menuTree: MenuVO[];
  toName?: string;
  fromName?: string;
  menuName?: string;
}

const state: State = {
  menuTree: [],
  toName: '',
  fromName: '',
  menuName: '',
};

const actions = {
  async createMenuData({commit}: {commit: Commit}, data: MenuVO) {
    try {
      const r = await getMenuTree();
      if (r.data.code === 0) {
        commit(types.MENU_DATA_CREATE, Object.assign({menuTree: r.data.data}, data));
      }
    } catch (e) {
    }
  },
  updateMenuData({commit}: {commit: Commit}, data: MenuVO) {
    commit(types.MENU_DATA_CREATE, data);
  },
  deleteMenuData({commit}: {commit: Commit}) {
    commit(types.MENU_DATA_CREATE, null);
  },
};

const mutations = {
  [types.MENU_DATA_CREATE](state: State, data: State) {
    if (data) {
      const {
        menuTree,
        menuName,
        toName,
        fromName,
      } = data;
      if (!state.menuTree.length) {
        state.menuTree = menuTree;
      }
      state.toName = toName;
      state.fromName = fromName;
      state.menuName = menuName;
    } else {
      state.menuTree = [];
      state.toName = '';
      state.fromName = '';
      state.menuName = '';
    }
  },
};

const getters = {
  menuTree: (state: State) => state.menuTree,
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
