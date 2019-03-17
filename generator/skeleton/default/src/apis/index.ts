import axios from 'axios';
import {Message, MessageBox} from 'element-ui';

const http = axios.create({
  baseURL: '/api',
});

http.interceptors.request.use();

http.interceptors.response.use(
  (response) => {
    if (response) {
      // 状态码拦截 示例如下
      switch (response.data.code) {
        case 401:
          MessageBox.alert('会话已过期, 请重新登录!', '提示', {
            confirmButtonText: '确定',
            type: 'warning',
            showClose: false,
            callback: (_) => {
              setTimeout(() => {
                location.href = '/#/auth/login';
              }, 0);
            },
          });
          break;
        case 403:
          Message.error(response.data.msg);
          break;
      }
    }
    return response;
  },
  (error) => {
    Message.error(
      error.response.data && error.response.data.msg || `服务器异常`,
    );
    return Promise.reject(error);
  },
);

export default http;
