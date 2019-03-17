import http from './index';

export interface UserVO {
  userAccount?: string;
  password?: string;
}

export const postLogin = (params: UserVO) => http.post(`/login`, params);

export const postLogout = () => http.post(`/logout`);


export default {
  postLogin,
  postLogout,
};
