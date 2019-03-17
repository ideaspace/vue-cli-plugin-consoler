import Vue from 'vue';
import Vuex from 'vuex';
import menuModule from './stores/modules/menu';
import containerModule from './stores/modules/container';
import breadcrumbModule from './stores/modules/breadcrumb';
import userModule from './stores/modules/user';
import createLogger from 'vuex/dist/logger';

const DEBUG = process.env.NODE_ENV === 'development';

Vue.use(Vuex);

const requireModule = require.context('@/views', true, /\.module\.js$/);

const modules: any = {};

requireModule.keys().forEach((fileName) => {

  const moduleDefinition = requireModule(fileName);

  if (modules[fileName] === moduleDefinition) {
    return;
  }

  modules[fileName] = moduleDefinition;
});

export default new Vuex.Store({
  modules: Object.assign({}, modules, {
    menu: menuModule,
    container: containerModule,
    user: userModule,
    breadcrumb: breadcrumbModule,
  }),
  strict: DEBUG,
  plugins: DEBUG ? [createLogger({})] : [],
});
