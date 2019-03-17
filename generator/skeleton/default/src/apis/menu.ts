import http from './index';

export interface MenuVO {
}

export const getMenuTree = () => http.get(`/menu`);

export default {
  getMenuTree,
};
