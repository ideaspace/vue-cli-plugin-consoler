import Vue from 'vue';
import Router, {RouteConfig} from 'vue-router';

Vue.use(Router);

const requireRouter = require.context('@/views', true, /\.router\.ts$/);

const routerAuth: RouteConfig = {
  path: '/auth',
  name: 'auth',
  redirect: {
    name: 'login',
  },
  component: () => import('@/components/view/AuthView.vue'),
  children: [],
};


const routerPage: RouteConfig = {
  path: '',
  name: 'page',
  component: () => import('@/components/view/PageView.vue'),
  children: [],
};


let routes: RouteConfig[] = [];

requireRouter.keys().forEach((fileName) => {
  routes = [...routes, ...requireRouter(fileName).default];
});


routes.forEach((route: RouteConfig) => {
  if (
    route &&
    route.name &&
    'login'.includes(route.name)
  ) {
    // @ts-ignore
    routerAuth.children.push(route);
  } else {
    // @ts-ignore
    routerPage.children.push(route);
  }
});


export default new Router({
  routes: [routerPage, routerAuth],
});
