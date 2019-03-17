import http from './index';

export interface AppListVO {
  dataCenterName: string;
  deleted: boolean;
  id: number;
  monitorItemNum: number;
  name: string;
  code: string;
  tenant: string;
}

export interface AppItemVO {
  applicationName: string;
  monitorMode: string;
  exporterName: string;
  target: string;
  monitorItemStatus: number;
}

export const getAppList = () => http.get(`/appList`);
export const getAppItem = () => http.get(`/appItem`);

export default {
  getAppList,
  getAppItem,
};
