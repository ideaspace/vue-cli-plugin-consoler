---
to: src/views/<%%= h.inflection.dasherize(name) %%>/<%%= h.inflection.dasherize(name) %%>.module.ts
---
import * as types from '@/stores/mutation-types';

export const <%%= h.inflection.dasherize(name) %%> = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {},
  getters: {},
};
