import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'

import '@/assets/css/reset.css'
import '@/assets/css/common.css'


import '@/utils/flexible.js'

Vue.config.productionTip = false

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')