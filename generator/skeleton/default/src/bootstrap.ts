import 'element-ui/lib/theme-chalk/index.css';
import './assets/style.scss';
import Element from 'element-ui';
import {VueConstructor} from 'vue';
import Component from 'vue-class-component';
import {Route} from 'vue-router';
import Comps from './components';
import router from './router';
import store from './store';

class Bootstrap {
  public router: any;
  public stores: any;

  constructor(routers: any, stores: any) {
    this.router = router;
    this.stores = stores;
  }

  public install(Vue: VueConstructor, options: any) {
    // Todo
    // allow user to use options to config the custom flow

    for (const key in Comps) {
      if (Comps.hasOwnProperty(key)) {
        Vue.component(key, Comps[key]);
      }
    }

    this.router.beforeEach(async (to: Route, from: Route, next: any) => {
      // 404 拦截
      if (to.matched.length === 0) {
        return next('/error/404');
      }
      // 未登录拦截
      if (to.fullPath === '/') {
        return next({
          path: !!this.stores.state.user.userAccount ? '/dashboard' : '/auth/login',
        });
      }
      // 登录页面拦截
      if (to.name === 'login') {
        this.stores.dispatch('menu/deleteMenuData');
        this.stores.dispatch('user/deleteUserData');
        return next();
      }
      if (
        this.stores.state.menu &&
        (
          this.stores.state.menu.menuTree === undefined ||
          this.stores.state.menu.menuTree.length === 0
        )
      ) {
        this.stores.dispatch('user/createUserData');
        this.stores.dispatch('menu/createMenuData', {toName: to.name, fromName: from.name});
        next();
      } else {
        this.stores.dispatch('menu/updateMenuData', {toName: to.name, fromName: from.name});
        next();
      }
      this.stores.dispatch('container/createLoading');
    });

    this.router.afterEach((to: Route, from: Route) => {
      document.title = `${require('./app.config').title}-${to.meta.title || ''}`;
      // 模拟页面加载效果，实际开发视情况保留或删除
      setTimeout(() => {
        this.stores.dispatch('container/createLoaded');
      }, 500);
    });

    // 注册 RouterHooks
    Component.registerHooks([
      'beforeRouteEnter',
      'beforeRouteLeave',
      'beforeRouteUpdate', // for vue-router 2.2+
    ]);

    // 重置 Element-Ui 部分组件的样式
    // @ts-ignore
    Element.Pagination.props.layout.default = 'total, prev, pager, next, sizes';
    // @ts-ignore
    Element.Table.props.border = {type: Boolean, default: true};
    // @ts-ignore
    Element.Input.props.clearable = {type: Boolean, default: true};
    // @ts-ignore
    Element.Card.props.shadow = {type: String, default: 'never'};
    // @ts-ignore
    Element.Dialog.props.appendToBody = {type: Boolean, default: true};
    // @ts-ignore
    Element.Dialog.props.closeOnClickModal = {type: Boolean, default: false};
    // @ts-ignore
    Element.Dialog.props.width = {type: String, default: '580px'};
    // @ts-ignore
    Element.Table.props.highlightCurrentRow = {type: Boolean, default: true};
    // @ts-ignore
    Element.TableColumn.props.showOverflowTooltip = {type: Boolean, default: true};
    // @ts-ignore
    Element.Pagination.props.background = {type: Boolean, default: true};
    // @ts-ignore
    Element.MessageBox.setDefaults({type: 'warning'});
    Vue.use(Element, {size: 'small'});
  }
}

export default new Bootstrap(router, store);
