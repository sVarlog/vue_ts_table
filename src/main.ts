import Vue from 'vue';
import App from './App.vue';
import store from './store';

import '@/assets/normalize.css';
import '@/assets/global.css';

Vue.config.productionTip = false;

new Vue({
    store,
    render: h => h(App)
}).$mount('#app');
