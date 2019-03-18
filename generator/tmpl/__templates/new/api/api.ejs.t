<%='---'%>
to: src/apis/<%%= h.inflection.dasherize(name) %%>.ts
<%='---'%>
import http from './index';
import { AxiosPromise, AxiosResponse } from 'axios';

interface <%%= h.inflection.capitalize(name) %%>VO {
}

export const get = (): AxiosPromise<AxiosResponse> => http.get(`/<%%= h.inflection.dasherize(name) %%>`);

export const post = (): AxiosPromise<AxiosResponse> => http.post(`/<%%= h.inflection.dasherize(name) %%>`);

export const put = (): AxiosPromise<AxiosResponse> => http.put(`/<%%= h.inflection.dasherize(name) %%>`);

export const delete = (): AxiosPromise<AxiosResponse> => http.delete(`/<%%= h.inflection.dasherize(name) %%>`);

export default {
  get,
  post,
  put,
  delete,
};
