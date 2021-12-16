import '@/plugins/vue-composition-api'
import '@/styles/styles.scss'
import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'
import common from '@/assets/js/common';
import axios from "@/plugins/axios";

Vue.config.productionTip = false

Vue.use(common);
Vue.use(axios);

new Vue({
  router,
  store,
  vuetify,
  common,
  axios,
  render: h => h(App),
}).$mount('#app')
