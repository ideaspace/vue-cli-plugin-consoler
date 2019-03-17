import http from './index';

export interface ListVO {
  createTime?: number;
  instance?: string;
  fromTemplateName?: string;
  alertName?: string;
  durationTime?: number;
  alertLevel?: string;
  status?: number;
  value?: number;
}

export const getTableList = () => http.get(`/list`);

export default {
  getTableList,
};
