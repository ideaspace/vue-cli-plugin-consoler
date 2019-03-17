import Vue from 'vue';
import App from './App.vue';
import Bootstrap from './bootstrap';

Vue.config.productionTip = false;

Vue.use(Bootstrap);

new Vue({
  router: Bootstrap.router,
  store: Bootstrap.stores,
  render: (h) => h(App),
}).$mount('#app');
