import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

import './assets/css/reset.css'
import './assets/css/common.css'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

// 初始化状态 ---> 同步修改
store.commit('games/SET_LEVELNUMBER', localStorage.getItem('fremember_dataStatistics_sudo_level'))
store.commit('user/SET_USERNAME', localStorage.getItem('fremember_dataStatistics_username'))
store.commit('user/SET_TOKEN', localStorage.getItem('fremember_dataStatistics_token'))

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
