import * as types from '../mutation-types';
import {getMenuTree} from './../../apis/menu';

interface MenuVO {
  menuTree: any[];
  toName?: string;
  fromName?: string;
  menuName?: string;
}

const state = {
  menuTree: [],
  toName: '',
  fromName: '',
  menuName: '',
};

const actions = {
  async createMenuData({commit}: any, data: MenuVO) {
    try {
      const r = await getMenuTree();
      if (r.data.code === 0) {
        commit(types.MENU_DATA_CREATE, Object.assign({menuTree: r.data.data}, data));
      }
    } catch (e) {
    }
  },
  deleteMenuData({commit}: any) {
    commit(types.MENU_DATA_CREATE, null);
  },
};

const mutations = {
  [types.MENU_DATA_CREATE](state: MenuVO, data: MenuVO) {
    if (data) {
      const {
        menuTree,
        menuName,
        toName,
        fromName,
      } = data;
      state.menuTree = menuTree;
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
  menuTree: (state: MenuVO) => state.menuTree,
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
