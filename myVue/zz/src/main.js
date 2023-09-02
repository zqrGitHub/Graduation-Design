import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 清除浏览器默认样式
import '../src/assets/reset.css'
// 使用elementui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
// axios模块
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
// 全局注册使用elementui的消息提示
import {Message} from 'element-ui';
Vue.prototype.$message = Message
// 使用echarts
import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
