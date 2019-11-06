import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'

import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(Mint)

import '@/assets/font/iconfont.css'

import request from '@/utils/request'
Vue.prototype.$ajax = request

import '@/assets/css/reset.css'
import '@/assets/css/common.css'

import '@/utils/flexible'

/* 全局引入过滤器 */
import * as filters from './utils/filters'
Object.keys(filters).forEach(key => {
	Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
