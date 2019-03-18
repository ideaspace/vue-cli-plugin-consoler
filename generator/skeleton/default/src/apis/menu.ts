import http from './index';

export interface MenuVO {
  hasChildren: boolean;
  items: MenuVO[] | null;
  menuId: number;
  menuName: string;
  menuLevel: number;
  menuIndex: number;
  menuIcon?: string;
  parMenuId: number;
  urlAddr?: string;
}

export const getMenuTree = () => http.get(`/menu`);

export default {
  getMenuTree,
};
