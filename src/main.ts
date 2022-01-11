import Vue from 'vue';
import VModal from 'vue-js-modal';
import App from './App.vue';
import { createProvider } from './vue-apollo';
 
Vue.config.productionTip = false;
Vue.use(VModal, { dialog: true });
 
new Vue({
  apolloProvider: createProvider(),
  render: h => h(App)
}).$mount('#app');