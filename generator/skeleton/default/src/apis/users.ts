import http from './index';

export const getUser = () => http.get(`/users/current`);

export default {
  getUser,
};
