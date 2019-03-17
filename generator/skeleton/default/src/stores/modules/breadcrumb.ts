 import * as types from '../mutation-types';

interface BreadcrumbVO {
  routeName: string;
  routeText: string;
  menuTree: any;
  routeParent: any;
}

interface CachedVO {
  [key: string]: any;
}

const state = {};

const actions = {
  createRouteData({commit}: any, data: BreadcrumbVO) {
    commit(types.ROUTE_DATA_CREATE, data);
  },
};

const mutations = {
  [types.ROUTE_DATA_CREATE](state: CachedVO, data: BreadcrumbVO) {
  },
};

const getters = {
  trace: (state: CachedVO) => state,
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
