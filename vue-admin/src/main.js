import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 加载插件
import '@/lib'

import './assets/css/reset.css'
import 'ant-design-vue/dist/antd.css'
import './assets/css/common.css'
import './assets/css/mine_antd.css'


createApp(App).use(router).use(store).use(Antd).mount('#app')
