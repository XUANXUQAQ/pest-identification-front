import Vue from 'vue';
import ElementUI from 'element-ui';
import orderApi from '@/network/order';
import genusApi from '@/network/genus';
import familyApi from '@/network/family';
import loginLogoutApi from '@/network/loginLogout';
import orderFamilyApi from '@/network/orderFamily';
import familyGenusApi from '@/network/familyGenus';
import speciesApi from './network/species';
import router from './router';
import './icons';
import store from './store';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/style/base.scss';
import App from './App.vue';

Vue.use(ElementUI);

Vue.prototype.$speciesApi = speciesApi;
Vue.prototype.$orderApi = orderApi;
Vue.prototype.$genusApi = genusApi;
Vue.prototype.$familyApi = familyApi;
Vue.prototype.$loginApi = loginLogoutApi;
Vue.prototype.$orderFamilyApi = orderFamilyApi;
Vue.prototype.$familyGenusApi = familyGenusApi;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
